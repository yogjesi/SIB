<template>
    <div>
    <v-card>
      <v-card-title>
        요금청구
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <h2>크게</h2>
      <v-data-table
        
        :headers="headers"
        :items="outcomes"
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
    <v-btn @click="moveToCreate">글 작성</v-btn>
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
        {
          text: '글번호',
          align: 'start',
          sortable: false,
          value: 'id',
        },
          { text: '글 쓴 날짜', value: 'created_at' },
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
