<template>
  <div>
    <div class="row">
      <div id="subtitle" class="col-6">
        <h4>시작 날짜</h4>
        <input type="date"  class="border m-2"
          pattern="\d{4}-\d{2}-\d{2}"
          required
          v-model.trim="startDate"
        >
      </div>
      <div id="subtitle" class="col-6">
        <h4>종료 날짜</h4>
        <input type="date"  class="border m-2"
          pattern="\d{4}-\d{2}-\d{2}"
          required
          v-model.trim="endDate"
        >
    </div>

    <div id="subtitle"><h3>카테고리</h3></div>
      <div id="subtitle" class="col-12 col-md-6 offset-md-3">
        <div class="input-group row">
          <span class="input-group-text justify-content-center">
            <div id="subtitle"><h4>전체 선택</h4></div>
            <input type="checkbox"
            @click="selectAll" 
            v-model="allSelected">
          </span>
          <div class="form-control">
            <div id="subtitle" style="font-weight:bold;"><h5>수입 분류</h5></div>    
            <div
              v-for="income in incomes"
              :key="income.id">
              <div>
                {{ income.name }}
                <input type="checkbox" v-model="categoryIds" :value="income.name">
              </div>
            </div>
          </div> 

          <div class="form-control">
            <div id="subtitle" style="font-weight:bold;"><h5>지출 분류</h5></div> 
            <div 
              v-for="outcome in outcomes"
              :key="outcome.id">
              <div>
                {{ outcome.name }}
                <input type="checkbox" v-model="categoryIds" :value="outcome.name">
              </div>
            </div>
          </div>
        </div>
        <br>
        <button id="btntext" class="btn btn-primary" @click="filterDate">조회</button>
      </div>
    </div>

    <hr>
    <div id="inputtext">
      <v-app class="container-fluid">
        <div class="col">
          <div id="subtitle" class="my-5"><h2>장부 확인</h2></div>
          <div style="display:flex; justify-content:flex-end">
            <button id="btntext" class="btn btn-success" type="button" v-on:click="onexport">Excel download</button>
          </div>
          
          <v-card>
            <!-- 잔액 : {{  sumField('in_money') - sumField('out_money')}} -->
            <v-data-table 
                :headers="headers" 
                :items="this.bookList" item-key="datetime">
                <template v-slot:item="{ item }">
                    <tr>
                        <td></td>
                        <td>{{item.datetime}}</td>
                        <td>{{item.category}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.in_money | Comma }}</td>
                        <td>{{item.out_money | Comma }}</td>
                        <td>{{item.balance | Comma}}</td>
                    </tr>
                </template>
                <template slot="body.append">
                    <tr>
                        <th class="title">Totals</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>{{ sumField('in_money') |Comma }}</th>
                        <th>{{ sumField('out_money') | Comma }}</th>
                        <th></th>
                    </tr>
                </template>
            </v-data-table>
          </v-card>

        </div>
        
      </v-app>
    </div>
  </div>

  
</template>

<script>
import {mapState} from 'vuex'
import XLSX from 'xlsx'


export default {
  name: 'Calendar',
  data: function(){
    return{
      headers: [ 
        {
          text: "",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: '날짜', value: 'datetime' },
        { text: '카테고리', value: 'category' },
        { text: '내용', value: 'title' },
        { text: '수입', value: 'in_money' },
        { text: '지출', value: 'out_money' },
        { text: '잔액', value: 'balance' },
      ],
      startDate:null,
      endDate:null,
      incomes: [ 
        { "id": "1", "name": "재정부"},
        { "id": "2", "name": "헌금"},
        { "id": "3", "name": "찬조금"},
        { "id": "4", "name": "기타수입"},
        ],
        outcomes: [ 
          { "id": "5", "name": "사업행사비"},
          { "id": "6", "name": "활동비"}, 
          { "id": "7", "name": "경조비"}, 
          { "id": "8", "name": "소모품비"}, 
          { "id": "9", "name": "기타지출"}, 
        ],
        selected: [],
        allSelected: false,
        categoryIds: [],
    }
  },
  methods: {
    sumField(key) {
      return this.bookList.reduce((a, b) => Number(a) + Number(b[key] || 0), 0)
    },
    filterDate: function() {
      const filterItems = {
        startDate: this.startDate,
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
      'bookList','lastBalance'
    ])
  },
  created:function(){
    this.$store.dispatch('allBookList')
    let date = new Date()
    this.endDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
    date.setMonth(date.getMonth() -1)
    this.startDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
  }
}
</script>

<style>

</style>