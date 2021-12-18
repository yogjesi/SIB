<template>
  <div>
    <h2>상세{{this.$route.params.id}}</h2>
    <div>
      {{selectOutcome.user.username}} | {{selectOutcome.created_at}}
    </div>
    <img v-if="isClickImage" :src="`http://127.0.0.1:8000${selectOutcome.receipt}`" alt="">
    <v-btn v-if="isClickImage" @click="clickImage">영수증 확인 완료</v-btn>
    <v-btn v-if="!isClickImage" @click="clickImage">영수증 확인</v-btn>

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
            <td>{{ item.state }}</td>
          </tr>
        </tbody>
      </template>
      </v-data-table>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name:'OutcomeDetail',
  data: function(){
    return{
      isClickImage:false, // 이미지 확인
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
    }
  },
  computed:{
    ...mapState([
      'selectOutcome'
    ])
  },
}
</script>

<style>

</style>