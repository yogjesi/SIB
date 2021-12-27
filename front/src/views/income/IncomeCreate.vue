<template>
  <div>
    <v-card>
      <div>
        <form @submit.prevent="formSubmit" method="post">
          <div>
            <select id="form-select" class="form-select" aria-label="Default select example">
              <option selected value="재정부">재정부</option>
              <option value="헌금">헌금</option>
              <option value="찬조금">찬조금</option>
              <option value="기타">기타 수입</option>
            </select>
          </div>
            <h1>수입 작성 양식</h1>
            <br>
            <h2>수입 내역</h2>
            <input type="text" placeholder="수입 타이틀" 
            required
            v-model.trim="inputTitle">
            <h2>금액</h2>
            <input type="Number" placeholder="금액" 
            required
            v-model.trim="inputMoney">
            <h2>수입 일시</h2>
            <input type="date" pattern="\d{4}-\d{2}-\d{2}" 
            required
            v-model.trim="inputDatetime">
            <h2>수입 상세 내역</h2>
            <input type="text" placeholder="수입에 관한 상세 내역을 입력해주세요." 
            required
            v-model.trim="inputContent">
            <br>
            <v-btn color="deep-purple white--text" class="m-2" outlined type="submit">작성 완료</v-btn>
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
        form.append("money", this.inputMoney)
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
        .post("http://127.0.0.1:8000/books/income/", form, {
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