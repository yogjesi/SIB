<template>
    <div class="col col-md-8 offset-md-2">
      <div id="title" class="mt-5 mb-3">
        <h2>
          수입 목록
        </h2>
      </div>
    <v-card id="board">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="제목 검색"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table        
        :headers="headers"
        :items="incomes"
        :search="search"
        :footer-props="{
          showFirstLastPage: true,
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus'
        }"
      >
      <template
        v-slot:body="{ items }"
      >
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
            @click="moveToDetail(item.id)"
          >
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.datetime }}</td>
            <td>{{ item.in_money | Comma }}</td>
            
          </tr>
        </tbody>
      </template>
      </v-data-table>

    </v-card>
    <br>
    <v-btn id="btntext" @click="moveToCreate">수입 작성</v-btn>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Income',
  data: function() {
    return{
      search:'',
      headers:[
          // { text: '글 쓴 날짜', value: 'created_at' },
          { text: '분류', value: 'category' },
          { text: '제목', value: 'title' },
          { text: '수입일', value:'datetime'},
          { text: '금액', value: 'in_money'},
      ]
    }
  },
  methods:{
      moveToDetail:function(income_id){
      console.log(income_id)
      this.$store.dispatch('selectIncome',income_id)

      this.$router.push({name:'IncomeDetail', params:{id:income_id}})
    },
    moveToCreate:function(){
      this.$router.push({name:'IncomeCreate'})
    }
  },
  computed: {
    ...mapState([
      'incomes'
    ])
  },
  created: function() {
    this.$store.dispatch('getIncomes')
  },
}
</script>

<style>

</style>