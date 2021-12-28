<template>
  <div>
    <div style="float:left;">
      <h4>시작 날짜</h4>
      <input type="date"  class="border m-2"
        pattern="\d{4}-\d{2}-\d{2}"
        required
        v-model.trim="startDate"
      >
    </div>
    <div>
      <h4>종료 날짜</h4>
      <input type="date"  class="border m-2"
        pattern="\d{4}-\d{2}-\d{2}"
        required
        v-model.trim="endDate"
      >
    <hr>
    <h4>카테고리</h4>
        <div>
          전체 <input type="checkbox" @click="selectAll" v-model="allSelected">
          <div >        
            <div
              v-for="income in incomes"
              :key="income.id">
              <div style="float:left;">
                {{ income.name }}
                <input type="checkbox" v-model="categoryIds" :value="income.name">
              </div>
            </div>
          </div>
          <hr>
          
          <div>지출
            <div 
              v-for="outcome in outcomes"
              :key="outcome.id">
              <div style="float:left;">
                {{ outcome.name }}
                <input type="checkbox" v-model="categoryIds" :value="outcome.name">
              </div>
            </div>
        </div>
      </div>
    <br>
  <div>Selected Ids: {{ categoryIds }}</div>
    <button style="background-color:red;" @click="filterDate">조회</button>
    <hr>
    <h4>장부</h4>
    <div class="result-table">
      <b-table striped hover bordered :items="this.bookList"></b-table>
      <button type="button" v-on:click="onexport">Excel download</button>
    </div>
  </div>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue'
import {mapState} from 'vuex'
import XLSX from 'xlsx'

export default {
  name: 'Calendar',
  components: {
    BTable
  },
  data: function(){
    return{
      startDate:null,
      endDate:null,
      incomes: [ 
        { "id": "1", "name": "재정부"},
        { "id": "2", "name": "헌금"},
        { "id": "3", "name": "찬조금"},
        { "id": "4", "name": "수입기타"},
        { "id": "10", "name": "제목1"},
        { "id": "11", "name": "글 제목2"},
        { "id": "12", "name": "글 제목"}, 
        ],
        outcomes: [ 
          { "id": "5", "name": "사업행사비"},
          { "id": "6", "name": "활동비"}, 
          { "id": "7", "name": "경조비"}, 
          { "id": "8", "name": "소모품비"}, 
          { "id": "9", "name": "지출기타"}, 
        ],
        selected: [],
        allSelected: false,
        categoryIds: [],
        
    }
  },
  methods: {
    filterDate: function() {
      const filterItems = {
          startDate : this.startDate,
          endDate: this.endDate,
          categoryIds: this.categoryIds
        }
      this.$store.dispatch('filterDate', filterItems)
    },

    selectAll: function() {
      var categoryIds = this.categoryIds
        if (!this.allSelected) {
          this.incomes.forEach(function (income) {
            if (categoryIds.indexOf(income.name)==-1)
              categoryIds.push(income.name)
          })
          this.outcomes.forEach(function (outcome) {
            if (categoryIds.indexOf(outcome.name)==-1)
              categoryIds.push(outcome.name)
          })
        this.allSelected = true 
        }else {
            this.categoryIds = []
          this.allSelected = false
        }
    },
    onexport () { 
      var data = XLSX.utils.json_to_sheet(this.bookList) 
      var wb = XLSX.utils.book_new() 
      XLSX.utils.book_append_sheet(wb, data, 'data') 
      XLSX.writeFile(wb, 'book.xlsx')
    }

  },
  computed:{
    ...mapState([
      'bookList'
    ])
  },
}
</script>

<style>

</style>