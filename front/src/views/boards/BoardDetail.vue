<template>
  <div>
    <div id="board" class="col col-md-8 offset-md-2">
      <div class="card border-light mb-3">
        <div class="card-header" style="text-align:start;">
          <h4>제목 : {{boardDetail.title}}</h4>        
          <h6>작성자 : {{boardDetail.user.fullname}}({{boardDetail.user.username}})</h6>
        </div>
        <div class="card-body">
          <h5><pre id="board" style="text-align:start;">{{boardDetail.content}}</pre></h5>
        </div>
        <div style="text-align:end;">
          <h6>작성일 : {{boardDetail.created_at|moment(`YYYY년 MM월DD일 HH시mm분`)}}</h6>
        </div>
      </div>      
    </div>
    <div>
      <div v-if="currentUser.id==boardDetail.user.id">
        <b-button id="btntext" class="mx-1 btn-primary" variant="none" @click="boardUpdate">수정</b-button>
        <b-button id="btntext" class="mx-1 btn-danger" @click="$bvModal.show('modal-scoped')">삭제</b-button>

        <b-modal id="modal-scoped">
          <template #modal-header>
            <h5>글 삭제 하기</h5>
          </template>
          <template #default>
            <p>글을 삭제하시겠습니까?</p>
          </template>

          <template #modal-footer="{ ok, cancel }">
            <b-button id="btntext" size="sm" variant="danger" @click="[ok(),boardDelete(boardDetail.id)]">
              예
            </b-button>
            <b-button id="btntext" size="sm" variant="secondary" @click="cancel()">
              아니요
            </b-button>
          </template>
        </b-modal>
      </div>

    </div>

    <div>
      
      
    </div>
    <iframe v-if="boardDetail.video" :src="videoSelect(boardDetail.video)" width="640" height="360" frameborder="0"></iframe>
    <img v-if="boardDetail.image"  :src="boardDetail.image" alt="">
    <!-- 댓글 창 -->
    <div class="col col-md-8 offset-md-2">
      <the-comment-form></the-comment-form>
    </div>
    

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