<template>
  <div>
    <h2>상세{{this.$route.params.id}}</h2>
    <div>
      {{selectOutcome.user.username}} | {{selectOutcome.created_at}}
    </div>
    <v-btn @click="moveToUpdate">수정</v-btn>
    <v-btn @click="deleteOutcome">삭제</v-btn>
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
            <td>{{ item.money }}</td>
            <td>{{ selectOutcome_state_str }}</td>
          </tr>
        </tbody>
      </template>
      </v-data-table>
      
    <img v-if="isClickImage" :src="`http://127.0.0.1:8000${selectOutcome.receipt}`" alt="">
    <v-btn v-if="isClickImage" @click="clickImage">영수증 확인 완료</v-btn>
    <v-btn v-if="!isClickImage" @click="clickImage">영수증 확인</v-btn>
    <br><br>

      <div>

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
      isClickImage:false, // 이미지 확인
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
          { text: '금액', value: 'money' },
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
      
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/books/outcome/${this.$route.params.id}/outcome_comment/`,
        headers: this.$store.state.setToken,
        data:{content:this.inputComment}
      })
        .then(res => {
          console.log(res)
          this.$store.dispatch('getOutcomeComment',this.$route.params.id) 
        })
        .catch(err => {
          console.log(err)
        })
      this.inputComment = ''
    },
    // 댓글 수정 이벤트 발생 >> 다시 댓글 목록 가져오기 
    updateComment:function(){
      this.$store.dispatch('getOutcomeComment',this.$route.params.id) 
    }
  },

  
  computed:{
    ...mapState([
      'selectOutcome',
      'selectOutcome_state_str',
      'outcome_comments',
      // 'currentuser', // 현재 유저가 권한있으면 버튼 보이게끔
    ]),   
  },
}
</script>

<style>

</style>