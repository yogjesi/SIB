<template>
  <b-card>
    <div> 
      <div class="input-group" >
        <span>
          <div style="justify-content:start;">
            {{commentItem.user.fullname}} : 
          </div>
          <br>
          <span v-show="!updateState">{{commentItem.content}}  </span>
          <input class="form-control" style="justify-content:center;" v-show="updateState" type="text" v-model="tmp" @keyup.enter="commentUpdate([commentItem,tmp])">
        </span>
        <span v-if="currentUser.id==commentItem.user.id">
          <b-button size="sm" v-show="!updateState" @click="updating">수정</b-button>
          <b-button size="sm" v-show="updateState" @click="commentUpdate([commentItem,tmp])">완료</b-button>
          <b-button size="sm" v-show="updateState" @click="canceling">취소</b-button>
          <b-button size="sm" v-show="!updateState" @click="$bvModal.show(`modal-${commentItem.id}`)">삭제</b-button>
          <b-modal :id="'modal-'+commentItem.id">
            <template #modal-header>
              <h5>댓글 삭제 하기</h5>
            </template>
            <template #default>
              <p>댓글을 삭제하시겠습니까?</p>
            </template>

            <template #modal-footer="{ ok, cancel }">
              <b-button size="sm" variant="danger" @click="[ok(),commentDelete([commentItem.boards,commentItem.id])]">
                예
              </b-button>
              <b-button size="sm" variant="secondary" @click="cancel()">
                아니요
              </b-button>
            </template>
          </b-modal>
        </span>
      </div>
    </div>
  </b-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'TheCommentListItem',
  data: function(){
    return {
      tmp: '',
      updateState:false,
    }
  },
  props:{
    commentItem:Object,
  },
  methods:{
    updating:function(){
      this.tmp = this.commentItem.content
      this.updateState=!this.updateState
    },
    canceling:function(){
      this.tmp = ""
      this.updateState=!this.updateState
    },
    commentUpdate:function(data){
      this.$store.dispatch('commentUpdate',data)
      this.updateState=!this.updateState
      this.tmp = ""
    },
    commentDelete:function(pk){
      console.log(pk)
      this.$store.dispatch('commentDelete',pk)
    }
  },
  computed:{
    ...mapState([
      'currentUser',
    ])
  }
}
</script>

<style>

</style>