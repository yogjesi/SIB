<template>
  <div id="subtitle" class="container-fluid my-5 px-3 col col-md-8 offset-md-2">
    <v-card>
      <div id="subtitle" class="col col-md-10 offset-md-1">
        <form @submit.prevent="formSubmit" method="post">
          <div>
            <div class="my-2">
              <h3>분류</h3>
            </div>
            <select id="form-select" class="form-select" aria-label="Default select example">
              <option selected value="재정부">재정부</option>
              <option value="헌금">헌금</option>
              <option value="찬조금">찬조금</option>
              <option value="기타 수입">기타 수입</option>
            </select>
          </div>
            <br>
            <h3>수입 내역</h3>
            <input type="text" placeholder="ex)0월 0째주 헌금" class="form-control border"
            required
            v-model.trim="inputTitle">
            <br>
            <h3>금액</h3>
            <input type="Number" placeholder="금액" class="form-control border"
            required
            v-model.trim="inputMoney">
            <p>입력하신 금액은 {{ inputMoney | Comma }}원 입니다.</p>
            <br>
            <h3>수입 일시</h3>
            <input type="date" pattern="\d{4}-\d{2}-\d{2}" class="form-control border"
            required
            v-model.trim="inputDatetime">
            <br>
            <h3>수입 상세 내역</h3>
            <input type="text" placeholder="ex) 감사헌금 00원, 십일조 00원" 
            class="form-control border"
            required
            v-model.trim="inputContent">
            <br>
            <v-btn id="btntext" color="deep-purple white--text" class="m-2" outlined type="submit">작성 완료</v-btn>
        </form>
      </div>
    </v-card>
  </div>
</template>

<script>
import http from "@/http"

export default {
  name: 'IncomeCreate',
  data:function() {
    return {
      inputTitle:null,
      inputContent:null,
      inputMoney:null,
      inputDatetime:null,
      response: null,
    }
  },
  methods:{
    incomeCreate:function(){
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
      if (this.inputTitle){
        form.append("title", this.inputTitle)
      }else{
        alert("수입내역을 입력하세요.")
      }
      if (this.inputContent){
        form.append("content", this.inputContent)
      }else{
        alert("상세수입경로를 입력하세요.")
      }
      if (this.inputMoney){
        form.append("in_money", this.inputMoney)
      }else{
        alert("수입 금액을 입력하세요.")
      }
      if (this.inputDatetime){
        form.append("datetime", this.inputDatetime);
        console.log('success')
      }else{
        alert("수입일자를 기입하세요.")
      }
      const token = localStorage.getItem('jwt')
      http
        .post("books/income/", form, {
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

<style scoped>
</style>