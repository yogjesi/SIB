from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Board,Comment
from .serializers import BoardListSerializer,BoardSerializer,CommentSerializer


@api_view(['GET','POST'])
def board_list_create(request):
    # 전체 freeboard 조회하기
    if request.method == 'GET':
        boards = get_list_or_404(Board.objects.order_by('-pk'))
        serializer = BoardListSerializer( boards, many = True)
        return Response(serializer.data)
    # freeboard에 글 작성하기
    elif request.method =='POST':
        serializer = BoardSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)

@api_view(['GET','PUT','DELETE'])
def board_detail_update_delete(request,board_pk):
    board = get_object_or_404(Board,pk=board_pk)
    # 상세 freeboard 조회하기
    if request.method == 'GET':
        tmp = board.updated_at
        tmp_hits = board.hits+1
        Board.objects.filter(pk=board_pk).update(hits=tmp_hits,updated_at=tmp)
        serializer = BoardSerializer(board)
        return Response(serializer.data)
    # 글 하나 선택해서 수정하기
    elif request.method=='PUT' and request.user==board.user:
        serializer = BoardSerializer(board,data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    # 글 하나 선택해서 삭제하기
    elif request.method =='DELETE' and request.user==board.user:
        board.delete()
        data = {
            'delete': f'데이터 {board_pk}번이 삭제되없습니다.',
        }
        return Response(data,status=status.HTTP_204_NO_CONTENT)
    return Response('글 작성 유저가 아닙니다.',status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def comment_list_create(request,board_pk):
    board = get_object_or_404(Board,pk=board_pk)
    # 게시글 댓글 조회
    if request.method =='GET':
        comments = Comment.objects.filter(boards=board)
        serializer = CommentSerializer(comments,many=True)
        return Response(serializer.data)
    # 댓글 생성
    elif request.method=='POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user,boards=board)
            return Response(serializer.data,status=status.HTTP_201_CREATED)

@api_view(['PUT','DELETE'])
def comment_update_delete(request,comment_pk):
    comment = get_object_or_404(Comment,pk=comment_pk)
    # 댓글 내용 수정
    if request.method =='PUT' and request.user==comment.user:
        serializer = CommentSerializer(comment,data=request.data)
        if serializer.is_valid(raise_exception=True):
             serializer.save()
             return Response(serializer.data)
    # 댓글 내용 삭제
    elif request.method =='DELETE' and request.user==comment.user:
        comment.delete()
        data = {
            'delete': f'댓글 {comment_pk} 번이 삭제되었습니다.'
        }
        return Response(data,status=status.HTTP_204_NO_CONTENT)
    return Response('글 작성 유저가 아닙니다.',status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def search(request):
    if request.method == 'POST':
        searchType = request.data['searchType']
        searched = request.data['keyword']
        # 제목 및 내용 및 작성자 검색
        if searchType =='제목':
            boards = Board.objects.filter(title__contains=searched)
        elif searchType =='내용':
            boards = Board.objects.filter(content__contains=searched)
        elif searchType =='작성자':
            user = get_user_model().objects.filter(pk=-1)
            if(get_user_model().objects.filter(fullname=searched)):
                user = get_user_model().objects.get(fullname=searched)
            elif(get_user_model().objects.filter(username=searched)):
                user = get_user_model().objects.get(username=searched)
            if user:
                boards = user.board_set.all()
            else:
                return Response('검색한 아이디는 존재하지 않습니다.',status=status.HTTP_400_BAD_REQUEST)
        serializers = BoardListSerializer(boards, many=True)
        return Response(serializers.data)