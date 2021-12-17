from django.shortcuts import get_object_or_404, render, get_list_or_404

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
    elif request.method=='PUT':
        serializer = BoardSerializer(board,data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    # 글 하나 선택해서 삭제하기
    elif request.method =='DELETE':
        board.delete()
        data = {
            'delete': f'데이터 {board_pk}번이 삭제되없습니다.',
        }
        return Response(data,status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def comment_list_create(request,board_pk):
    board = get_object_or_404(Board,pk=board_pk)
    # 게시글 댓글 조회
    if request.method =='GET':
        comments = Comment.objects.filter(board=board)
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
    if request.method =='PUT':
        serializer = CommentSerializer(comment,data=request.data)
        if serializer.is_valid(raise_exception=True):
             serializer.save()
             return Response(serializer.data)
    # 댓글 내용 삭제
    elif request.method =='PUT':
        comment.delete()
        data = {
            'delete': f'댓글 {comment_pk} 번이 삭제되었습니다.'
        }
        return Response(data,status=status.HTTP_204_NO_CONTENT)