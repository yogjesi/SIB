<template>
  <div class="col col-md-8 offset-md-2">
    <div id="title">
      <h2>제목 : {{ selectOutcome.title }}</h2>
    </div>
    <div id="subtitle">
      {{selectOutcome.user.fullname}} | {{selectOutcome.created_at|moment(`YYYY년 MM월DD일 HH시mm분`)}}
    </div>
    <div v-if="selectOutcome.state==1">
      <div v-if="currentUser.username==selectOutcome.user.username">
        <v-btn @click="moveToUpdate">수정</v-btn>
        <v-btn @click="deleteOutcome">삭제</v-btn>
      </div>
    </div>

    <v-data-table id="board"
        
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
            <td>{{ item.out_money | Comma }}</td>
            <td>{{ selectOutcome_state_str }}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
      
      <!-- `https://ycjeil-youth.link${selectOutcome.receipt}` -->
    <img :src="fixImage(selectOutcome.id)" alt="" style="width:450px;">

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
    <!-- 댓글창 -->
    <b-input-group>
      <input id="inputtext" @keyup.enter="createOutcomeComment" v-model="inputComment" type="text" class="form-control"
      placeholder="댓글 작성">
      <v-btn id="btntext" @click="createOutcomeComment">입력</v-btn>
    </b-input-group>


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
      inputComment:'',  // 댓글 입력
      emailInput:{
        email:'',
        // link: '',
        state:'',
        article:''
      },
      
      headers:[
        {
          text: '카테고리',
          align: 'start',
          value: 'category',
        },
          { text: '상세 내용', value: 'content' },
          { text: '사용일시', value: 'datetime' },
          { text: '금액', value: 'out_money' },
          { text: '승인/반려', value: 'state' },
     ],

    }
  },
  methods:{
    // 이메일 알림 (승인 버튼이 눌릴 때)
    emailAlarm: function() {
      this.emailInput.email= this.currentUser.email 
      // this.emailInput.link = `http://localhost:8080/outcomedetail/${this.$route.params.id}`
      this.emailInput.article = this.selectOutcome
      // axios.post('https://bq7tb4g4lb.execute-api.ap-northeast-2.amazonaws.com/default/alarm', JSON.stringify(this.emailInput))
      axios.post('https://pno7mi85q0.execute-api.us-east-1.amazonaws.com/default/sujintest', JSON.stringify(this.emailInput))
        .then(() => {
        })
        .catch(() => {
        })
    },
    clickImage:function(){
      this.isClickImage = ! this.isClickImage
    },
    stateToReady:function(){
      this.$store.dispatch('changeState',1) // 승인 -> 승인대기
      if (this.selectOutcome.alarm){ 
        this.emailInput.state= '취소'
        this.emailAlarm()    
      }
    },
    stateToAccept:function(){
      this.$store.dispatch('changeState',2) // 승인대기 -> 승인
      if (this.selectOutcome.alarm){ 
        this.emailInput.state= '승인'
        this.emailAlarm()    
      }
    },
    stateToReject:function(){
      this.$store.dispatch('changeState',3) // 승인대기 -> 반려
      if (this.selectOutcome.alarm){
        this.emailInput.state= '반려'
        this.emailAlarm()
      }
    },
    moveToUpdate:function(){
      this.$router.push({name:'OutcomeUpdate', params:{id:this.$route.params.id}})
    },
    deleteOutcome:function(){
      axios({
        method: 'delete',
        url: `https://ycjeil-youth.link/books/outcome/${this.$route.params.id}/`,
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
          url: `https://ycjeil-youth.link/books/outcome/${this.$route.params.id}/outcome_comment/`,
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
    },
    fixImage:function(id) {
      if (id < 46) {
        let tmp = this.selectOutcome.receipt.length
        return `https://ycjeil-youth.link/media/${this.selectOutcome.receipt.slice(62,tmp)}`
      }else {
        return `${this.selectOutcome.receipt}`
      }
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