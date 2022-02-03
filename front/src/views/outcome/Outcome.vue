<template>
    <div class="col col-md-8 offset-md-2">
      <!-- 페이지 제목은 subtitle -->
      <div id="title" class="mt-5 mb-3">
        <h2>요금 청구</h2>
      </div>
    
      <v-card id="board">
        <v-card-title>
          <v-spacer></v-spacer>
          <!-- 검색어용 id는 inputtitle -->
          <v-text-field id="inputtitle"
            v-model="search"
            append-icon="mdi-magnify"
            label="제목 검색"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="outcomes"
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
              <td>{{ item.created_at|moment(`YYYY년 MM월DD일 HH시mm분`) }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.user }}</td>

              <td v-if="item.state==1">승인대기</td>
              <td v-if="item.state==2">승인</td>
              <td v-if="item.state==3">반려</td>
            </tr>
          </tbody>
        </template>
        </v-data-table>

      </v-card>
      <br>
      <v-btn @click="moveToCreate">요금 청구</v-btn>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name:'Outcome',
  data: function(){
    return{
      search:'',
      headers:[
          { text: '글 쓴 날짜', value: 'created_at'},
          { text: '제목', value: 'title' },
          { text: '작성자', value: 'user' },
          { text: '승인여부', value: 'state' },
     ],
    }
  },
  methods:{
    moveToDetail:function(outcome_id){
      this.$store.dispatch('selectOutcome',outcome_id)
      this.$store.dispatch('getOutcomeComment',outcome_id)

      this.$router.push({name:'OutcomeDetail', params:{id:outcome_id}})
    },
    moveToCreate:function(){
      this.$router.push({name:'OutcomeCreate'})
    }
  },
  computed:{
    ...mapState([
      'outcomes'
    ])
  },
  created: function() {
    this.$store.dispatch('getOutcomes')
  },
}
</script>

<style>

</style>
