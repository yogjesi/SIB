<template>
  <div id="inputtext">
    <div class="d-inline">{{outcome_comment.user.fullname }} ✍🏻 </div>
    <div class="d-inline" v-if="!isUpdate"> {{outcome_comment.content}}</div>
    

    <!-- 댓글 수정 -->
    <div v-if="!isUpdate" class="d-inline">
      <v-btn
        id="btntext"
        small
        v-if="isMycomment"
        data-bs-toggle="modal" :data-bs-target="`#updatecomment-${outcome_comment.id}`"
        class="m-3"
        @click="clickUpdate"
        >
        수정
        </v-btn>
    </div>
    
    <!-- 댓글 수정 모달 -->
    <div class="modal fade" :id="`updatecomment-${outcome_comment.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Comment</h5>
              <button id="btntext" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">댓글 내용 </label>
                  <input type="text" class="form-control" id="message-text" v-model="inputContent" @keyup.enter="updateComment">
                  <!-- <ㅑ class="form-control" id="message-text" v-model="inputContent"></ㅑ> -->
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <v-btn id="btntext" color="deep-purple darken3 white--text" data-bs-dismiss="modal" @click="updateComment">완료</v-btn>
              <v-btn id="btntext" color="deep-purple darken3 white--text" outlined data-bs-dismiss="modal">취소</v-btn>
            </div>
          </div>
        </div>
      </div>
    <div v-if="isUpdate">
      <input type="text"
        v-model="inputContent"
        @keyup.enter="updateComment"
      >
      <v-btn id="btntext" @click="updateComment">완료</v-btn>
      <v-btn id="btntext" @click="cancleUpdate">취소</v-btn>
    </div>

      <!-- ### 댓글 삭제 ###  -->
    <div class="d-inline">
        <v-btn
          id="btntext"
          small
          v-if="isMycomment"
          data-bs-toggle="modal" :data-bs-target="`#deleteComment-${outcome_comment.id}`"
          >
          삭제
          </v-btn>
      </div>

    <!-- 댓글 삭제 모달 -->
    <div class="modal fade" :id="`deleteComment-${outcome_comment.id}`" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">댓글 삭제</h5>
            <button id="btntext"  type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <p> 삭제하시겠습니까? </p>
          </div>
          <div class="modal-footer">
            <v-btn id="btntext" color="deep-purple darken3 white--text" data-bs-dismiss="modal" @click="deleteComment">예</v-btn>
            <v-btn id="btntext" color="deep-purple darken3 white--text" outlined data-bs-dismiss="modal">아니오</v-btn>
          </div>
        </div>
      </div>
    </div>


  </div>

  
</template>

<script>
import axios from 'axios'

export default {
  name:'OutcomeCommentItem',
  props:{
    outcome_comment:{
      type:Object
    }
  },
  data:function(){
    return{
      inputContent:this.outcome_comment.content,
      isMycomment:null,
      isUpdate:false,
    }
  },
  methods:{
    isMine:function(){
      axios({
        method: 'get',
        url: `https://ycjeil-youth.link/books/outcome/${this.outcome_comment.id}/outcome_comment_update_delete/`,
        headers: this.$store.state.setToken,
      })
        .then(res => {
          console.log(res.data)
          this.isMycomment = res.data.isMine
        })
        .catch(err => {
          console.log(err)
        })
    },
    clickUpdate:function(){
      this.isUpdate = !this.isUpdate
    },

    updateComment:function(){
      if (this.inputContent){
        axios({
          method: 'put',
          url: `https://ycjeil-youth.link/books/outcome/${this.outcome_comment.id}/outcome_comment_update_delete/`,
          headers: this.$store.state.setToken,
          data:{content:this.inputContent}
        })
          .then(res => {
            console.log(res.data)
            this.isUpdate = false
            this.$emit('updateComment')
          })
          .catch(err => {
            console.log(err)
          })
      }else{
        alert("댓글내용을 입력하세요")
      }
    },
    cancleUpdate:function(){
      this.inputContent = this.outcome_comment.content
      this.isUpdate = false
    },
    deleteComment:function(){
      axios({
        method: 'delete',
        url: `https://ycjeil-youth.link/books/outcome/${this.outcome_comment.id}/outcome_comment_update_delete/`,
        headers: this.$store.state.setToken,
      })
        .then(res => {
          console.log(res.data)
          this.$emit('updateComment')
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created:function(){
    this.isMine()
  }
}
</script>

<style>

</style>