<template>
  <div>
    <h1>{{this.$route.params.id}}번 상세보기</h1>
    <div>
      <h6>작성 일자 : {{selectIncome.created_at}}</h6>
    </div>
    <v-btn @click="moveToUpdate">수정</v-btn>
    <v-btn @click="deleteIncome">삭제</v-btn>
    <v-data-table
        
        :headers="headers"
        :items="[selectIncome]"
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
            <td>{{ item.in_money | Comma }}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'

export default {
  name: 'IncomeDetail',
  data:function(){
    return {
      headers:[
        {
          text: '분류',
          align: 'start',
          value: 'category',
        },
          { text: '내용', value: 'content' },
          { text: '사용일시', value: 'datetime' },
          { text: '금액', value: 'in_money' },
      ],
    }
  },
  methods:{
    moveToUpdate:function(){
      this.$router.push({name:'IncomeUpdate', params:{id:this.$route.params.id}})
    },
    deleteIncome:function(){
      axios({
        method: 'delete',
        url: `https://ycjeil-youth.link/books/income/${this.$route.params.id}/`,
        headers: this.$store.state.setToken,
      })
        .then(res => {
          console.log(res)
          this.$router.push({name:'Income'})
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  computed:{
    ...mapState([
      'selectIncome',
    ])
  }

}
</script>

<style>

</style>