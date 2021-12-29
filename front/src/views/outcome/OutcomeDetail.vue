<template>
  <div>
    <h2>상세{{this.$route.params.id}}</h2>
    <div>
      {{selectOutcome.user.username}} | {{selectOutcome.created_at}}
    </div>
    <div v-if="selectOutcome.state==1">
      <div v-if="currentUser.username==selectOutcome.user.username">
        <v-btn @click="moveToUpdate">수정</v-btn>
        <v-btn @click="deleteOutcome">삭제</v-btn>
      </div>
    </div>

    <v-data-table
        
        :headers="headers"
        :items="[selectOutcome]"
      >
      <template
        v-slot:body="{ items }"
      >
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
          >
            <td>{{ item.category }}</td>
            <td>{{ item.content }}</td>
            <td>{{ item.datetime }}</td>
            <td>{{ item.out_money }}</td>
            <td>{{ selectOutcome_state_str }}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
      
    <img :src="`http://127.0.0.1:8000${selectOutcome.receipt}`" alt="">
    <br><br>

      <!-- <div v-if="this.$store.state.currentUser == 2"> -->
      <div v-if="this.$store.state.currentUser.authority == 2">
      
        <!-- 승인 -> 승인대기 -->
        <v-btn v-if="selectOutcome_state_str=='승인'" @click="stateToReady">승인 취소</v-btn>
        <!-- 승인대기 -> 승인 -->
        <v-btn v-if="selectOutcome_state_str=='승인대기'" @click="stateToAccept">승인</v-btn>
        <!-- 승인대기 -> 반려 -->
        <v-btn v-if="selectOutcome_state_str=='승인대기'" @click="stateToReject">반려</v-btn>
      </div>
    <hr>  
    
    <!-- 댓글창 -->
    <input @keyup.enter="createOutcomeComment" v-model="inputComment" type="text" class="border">
    <v-btn @click="createOutcomeComment">댓글 작성</v-btn>

    <!-- 댓글 목록 -->
    <outcome-comment-item
      v-for="outcome_comment in outcome_comments"
      :key="outcome_comment.id"
      :outcome_comment="outcome_comment"
      @updateComment="updateComment"
    >
    </outcome-comment-item>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import OutcomeCommentItem from '@/components/outcome/OutcomeCommentItem'
export default {
  name:'OutcomeDetail',
  components:{
    OutcomeCommentItem
  },
  data: function(){
    return{
      state_str:'',
      inputComment:'',  // 댓글 입력
      headers:[
        {
          text: '카테고리',
          align: 'start',
          // sortable: false,
          value: 'category',
        },
          { text: '내용', value: 'content' },
          { text: '사용일시', value: 'datetime' },
          { text: '금액', value: 'out_money' },
          { text: '승인/반려', value: 'state' },
     ],

    }
  },
  methods:{
    clickImage:function(){
      this.isClickImage = ! this.isClickImage
    },
    stateToReady:function(){
      this.$store.dispatch('changeState',1) // 승인 -> 승인대기
    },
    stateToAccept:function(){
      this.$store.dispatch('changeState',2) // 승인대기 -> 승인
    },
    stateToReject:function(){
      this.$store.dispatch('changeState',3) // 승인대기 -> 반려
    },
    moveToUpdate:function(){
      this.$router.push({name:'OutcomeUpdate', params:{id:this.$route.params.id}})
    },
    deleteOutcome:function(){
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/books/outcome/${this.$route.params.id}/`,
        headers: this.$store.state.setToken,
      })
        .then(res => {
          console.log(res)
          this.$router.push({name:'Outcome'})
        })
        .catch(err => {
          console.log(err)
        })
    },
    createOutcomeComment:function(){
      if (this.inputComment){
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/books/outcome/${this.$route.params.id}/outcome_comment/`,
          headers: this.$store.state.setToken,
          data:{content:this.inputComment}
        })
          .then(res => {
            console.log(res)
            this.$store.dispatch('getOutcomeComment',this.$route.params.id) 
            this.inputComment = ''
          })
          .catch(err => {
            console.log(err)
          })
      }else{
        alert("댓글 내용을 작성하세요")
      }
      
    },
    // 댓글 수정 이벤트 발생 >> 다시 댓글 목록 가져오기 
    updateComment:function(){
      this.$store.dispatch('getOutcomeComment',this.$route.params.id) 
    }
  },

  // created:function(){
  //   console.log('현재 유저의 정보는 ',this.$store.state.currentUser.authority)
  // },
  computed:{
    ...mapState([
      'selectOutcome',
      'selectOutcome_state_str',
      'outcome_comments',
      'currentUser', // 현재 유저가 권한있으면 버튼 보이게끔
    ]),   
  },
}
</script>

<style>

</style>