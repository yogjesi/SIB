<template>
  <div>
    <h2>상세글</h2>
    <div>
      <span class="display-4">{{boardDetail.title}}</span>
      <div v-if="currentUser.id==boardDetail.user.id">
        <b-button @click="boardUpdate">수정</b-button>
        <b-button @click="$bvModal.show('modal-scoped')">삭제</b-button>

        <b-modal id="modal-scoped">
          <template #modal-header>
            <h5>글 삭제 하기</h5>
          </template>
          <template #default>
            <p>글을 삭제하시겠습니까?</p>
          </template>

          <template #modal-footer="{ ok, cancel }">
            <b-button size="sm" variant="danger" @click="[ok(),boardDelete(boardDetail.id)]">
              예
            </b-button>
            <b-button size="sm" variant="secondary" @click="cancel()">
              아니요
            </b-button>
          </template>
        </b-modal>
      </div>

    </div>
    <div>
      <span>{{boardDetail.user.fullname}}({{boardDetail.user.username}})</span>
      <span>{{boardDetail.created_at|moment(`YYYY년 MM월DD일 HH시mm분`)}}</span>
    </div>
    <p>{{boardDetail.content}}</p>
    <iframe v-if="boardDetail.video" :src="videoSelect(boardDetail.video)" width="640" height="360" frameborder="0"></iframe>
    <img v-if="boardDetail.image"  width="640" height="360" :src="boardDetail.image" alt="">
    <h1>num</h1>
    <hr>
    <!-- 댓글 창 -->
    <the-comment-form></the-comment-form>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import TheCommentForm from '@/components/boards/TheCommentForm'
export default {
  name:'TheBoardDetail',
  computed:{
    ...mapState([
      'boardDetail','currentUser'
    ])
  },
  methods:{
    videoSelect: function(source){
      // 기본 유튜브 주소를 접근할 경우, 접근 거부를 당함, 따라서 기본 유튜브 주소일떄는, 접근 가능한 주소로 변경할 필요가 있다.
      if (!source){
        return null
      }else if(source.indexOf("=")>0){
        const index = source.indexOf("=")
        return `https://www.youtube.com/embed/${source.substr(index+1)}`
      }else{
        return source
      }
    },
    boardUpdate:function(){
      this.$router.push({name:'BoardUpdate'})
    },
    boardDelete:function(pk){
      this.$store.dispatch('boardDelete',pk)
      this.$router.push({name:'Board'})
    }
  },
  components:{
    TheCommentForm
  },
  created: function(){
    this.$store.dispatch('boardDetail',this.$route.params.boardPk)
    this.$store.dispatch('commentList',this.$route.params.boardPk)
  }
}
</script>

<style>

</style>