<template>
  <div>
    <h2>상세{{this.$route.params.id}}</h2>
    <div>
      {{selectOutcome.user.username}} | {{selectOutcome.created_at}}
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



  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name:'OutcomeDetail',
  data: function(){
    return{
      isClickImage:false, // 이미지 확인
      state_str:'',
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
      this.$store.dispatch('changeState',1)
      // this.$store.dispatch('selectOutcome',this.$route.params.id)
      
    },
    stateToAccept:function(){
      this.$store.dispatch('changeState',2)
      // this.$store.dispatch('selectOutcome',this.$route.params.id)
    
    },
    stateToReject:function(){
      this.$store.dispatch('changeState',3)
      // this.$store.dispatch('selectOutcome',this.$route.params.id)
      
    },
  },

  
  computed:{
    ...mapState([
      'selectOutcome',
      'selectOutcome_state_str',
      // 'currentuser', // 현재 유저가 권한있으면 버튼 보이게끔
    ]),   
  },
}
</script>

<style>

</style>