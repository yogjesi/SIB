<template>
    <div>
    <v-card>
      <v-card-title>
        수입 목록
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        
        :headers="headers"
        :items="incomes"
        :search="search"
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
            <td>{{ item.id }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.datetime }}</td>
            <td>{{ item.in_money }}</td>
            
          </tr>
        </tbody>
      </template>
      </v-data-table>

    </v-card>
    <br>
    <v-btn @click="moveToCreate">글 작성</v-btn>
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
        {
          text:'글번호',
          align:'start',
          sortable: false,
          value: 'id',
        },
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