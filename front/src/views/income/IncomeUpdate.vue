<template>
  <div>
    <v-card>
      <div>
        <form @submit.prevent="formSubmit" method="post">
          <div>
            <div>
              <h2>분류</h2>
            </div>
            <select id="form-select" class="form-select" aria-label="Default select example">
              <option selected value="재정부">재정부</option>
              <option value="헌금">헌금</option>
              <option value="찬조금">찬조금</option>
              <option value="기타 수입">기타 수입</option>
            </select>
          </div>
          <br>
          <h2>수입 내역</h2>
          <input type="text" placeholder="ex)0월 0째주 헌금" class="form-control border" 
          required
          v-model.trim="income.title">
          <h2>금액</h2>
          <input type="text" placeholder="금액" class="form-control border"
          required
          v-model.trim="income.in_money">
          <p>입력하신 금액은 {{ income.in_money | Comma }}원 입니다.</p>
          <h2>수입 일시</h2>
          <input type="date" pattern="\d{4}-\d{2}-\d{2}" 
          class="form-control border"
          required
          v-model.trim="income.datetime">
          <h2>수입 상세 내역</h2>
          <input type="text" placeholder="ex) 감사헌금 00원, 십일조 00원"  
          class="form-control border"
          required
          v-model="income.content">
          <br>
          <v-btn color="deep-purple white--text" class="m-2" outlined type="submit">작성 완료</v-btn>
        </form>
      </div>
    </v-card>
  </div>
</template>

<script>
import http from "@/http"
import {mapState} from 'vuex'

export default {
  name: 'IncomeUpdate',
  data:function() {
    return{
      income:Object,
      response:null,
    }
  },
  computed:{
    ...mapState([
      'selectIncome'
    ])
  },
  created: function() {
    this.income = this.selectIncome
  },
  methods:{
    incomeCreate:function() {
      var selectCategory = document.querySelector('#form-select').value
      console.log(selectCategory)
    },
    async formSubmit() {
      let form = new FormData()
      var selectCategory = document.querySelector('#form-select').value
      if (selectCategory){
        form.append("category",selectCategory)
      } else {
        alert("분류를 선택하세요.")
      }
      if (this.income.title){
        form.append("title", this.income.title)
      }else{
        alert("수입내역을 입력하세요.")
      }
      if (this.income.content){
        form.append("content", this.income.content)
      }else{
        alert("상세수입경로를 입력하세요.")
      }
      if (this.income.in_money){
        form.append("in_money", this.income.in_money)
      }else{
        alert("수입 금액을 입력하세요.")
      }
      if (this.income.datetime){
        form.append("datetime", this.income.datetime)
      }else{
        alert("수입일자를 기입하세요.")
      }
      const token = localStorage.getItem('jwt')
      http
        .put(`books/income/${this.$route.params.id}/`, form, {
          headers: {
            "Content-Type":"multipart/form-data",
            // 이부분 한 번 더 보기
            "Authorization": `JWT ${token}`
          },
        })
        .then(res => {
          this.response = res
          this.$router.push({ name: 'Income' })
        })
        .catch(error => {
          this.response = error
        })
    return true
    }
  }
  

}
</script>

<style>

</style>