<template>
  <div id="subtitle" class="container-fluid my-5 px-3 col col-md-8 offset-md-2">
    <v-card>
        <div id="subtitle" class="file-upload col col-md-10 offset-md-1">
        <form @submit.prevent="formSubmit" method="post">
          <br>
          <div class="m-2">
            <select id="form-select" class="form-select" aria-label="Default select example">
              <option selected value="사업행사비">사업행사비</option>
              <option value="활동비">활동비</option>
              <option value="경조비">경조비</option>
              <option value="교통비">교통비</option>
              <option value="소모품비">소모품비</option>
              <option value="기타 지출">기타 지출</option>
            </select>
          </div>
          <br>

        <div class="m-2">
          <div>지출 내역</div>
              <input type="text"  class="form-control border"
                placeholder="ex)김밥, 수련회 등"
                required
                v-model.trim="inputTitle"
              >
        </div>
        <br>
        <div class="m-2">
          <div>지출 금액</div>
              <input type="Number" class="form-control border"
                placeholder="금액"
                required
                v-model.trim="inputMoney"
              >
              <p>입력하신 금액은 {{ inputMoney | Comma }}원 입니다.</p>
        </div>
        
        <br>
        <div class="m-2">
          <div>지출 일시</div>
              <input type="date" class="form-control border"
                pattern="\d{4}-\d{2}-\d{2}"
                required
                v-model.trim="inputDatetime"
              >
        </div>
        <br>
        <br>
        <div class="m-2">
          <div>지출 상세 내역 </div>
              <input type="text" class="form-control border"
                placeholder="ex)언제, 어디서, 누구와"
                v-model.trim="inputContent"
                required
              >
        </div>
        <br>
        <div class="m-2">
          <div>알림 여부</div>
          <label><input type="radio" name="true" value="true" v-model.trim="isAlarm" checked> Yes</label>
          <label class="m-5"><input type="radio" name="false" value="false" v-model.trim="isAlarm"> No</label>
          <br>
        </div>

        <div class="m-2"> 
        <br>
          <div>영수증 첨부</div>
          <input required type="file" class="form-control border" ref="selectFile" @change="previewFile" />
          
          <img v-if="previewImgUrl" :src="previewImgUrl" />
        </div>

          <v-btn color="deep-purple white--text" class="m-2" outlined type="submit" :disabled="isUploading">Upload</v-btn>

          <div>
            <hr>
            <!-- response : {{ response }} -->
          </div>
        </form>
      </div>
      
      </v-card>
    
    



    <!-- <v-btn @click="outcomeCreate">작성 완료</v-btn> -->
  </div>
</template>

<script>
import http from "@/http"

export default {
  name:'OutcomeCreate',
  data:function(){
    return{
      inputTitle:null,
      inputContent:null,
      inputMoney:null,
      inputDatetime:null,
      isAlarm:true,
      // options:[
      // 'event',
      // 'activity',
      // 'celebrity',
      // 'transportation',
      // 'fixtures',
      // 'etc'
      // ],
      selectFile: null, // 파일 객체
      previewImgUrl: null, // 미리보기 이미지 URL
      isUploading: false, // 파일 업로드 체크
      response: null, // 파일 업로드후 응답값
    }
  },
  methods:{
    outcomeCreate:function(){
      var selectCategory = document.querySelector('#form-select').value
      console.log(selectCategory)
    },
    previewFile() {
        // 선택된 파일이 있는가?
        if (0 < this.$refs.selectFile.files.length) {
          // 0 번째 파일을 가져 온다.
          this.selectFile = this.$refs.selectFile.files[0]
          // 마지막 . 위치를 찾고 + 1 하여 확장자 명을 가져온다.
          let fileExt = this.selectFile.name.substring(
            this.selectFile.name.lastIndexOf(".") + 1
          )
          // 소문자로 변환
          fileExt = fileExt.toLowerCase()
          // 이미지 확장자 체크, 1메가 바이트 이하 인지 체크
          if (
            ["jpeg", "jpg", "png", "gif", "bmp"].includes(fileExt) &&
            this.selectFile.size <= 2048576
          ) {
            // FileReader 를 활용하여 파일을 읽는다
            var reader = new FileReader()
            reader.onload = e => {
              // base64
              this.previewImgUrl = e.target.result
            }
            reader.readAsDataURL(this.selectFile)
          } else if (this.selectFile.size <= 2048576) {
            // 이미지외 파일
            this.previewImgUrl = null
          } else {
            alert("파일을 다시 선택해 주세요.")
            this.selectFile = null
            this.previewImgUrl = null
          }
        } else {
          // 파일을 선택하지 않았을때
          this.selectFile = null
          this.previewImgUrl = null
        }
        console.log(this.selectFile)
      },

    async formSubmit() {
      if (this.selectFile) {
        let form = new FormData()
        // Form 필드 생성
        form.append("receipt", this.selectFile) // api file name
       
      var selectCategory = document.querySelector('#form-select').value
      if (selectCategory){
        form.append("category",selectCategory)
      }else{
        alert("카테고리를 선택해 주세요.")
      }
      if (this.inputTitle){
        form.append("title",this.inputTitle)
      }else{
        alert("지출내역을 입력해 주세요.")
      }
      if (this.inputContent){
        form.append("content",this.inputContent)
      }else{
        alert("지출상세내역을 입력해 주세요.")
      }
      if (this.inputMoney){
        form.append("out_money",this.inputMoney)
      }else{
        alert("지출금액을 입력해 주세요.")
      }
      if (this.inputDatetime){
        form.append("datetime",this.inputDatetime)
      }else{
        alert("지출일시를 골라주세요.")
      }
      if (this.isAlarm){
        form.append("alarm",this.isAlarm)
      }else{
        alert("알림여부를 선택해 주세요.")
      }
      const token = localStorage.getItem('jwt')
      http
        .post("books/outcome/", form, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization":`JWT ${token}`
          },
        })
        .then(res => {
          this.isUploading = true
          this.response = res
          this.$router.push({ name: 'Outcome' })
          this.isUploading = false
        })
        .catch(error => {
          this.response = error
          this.isUploading = false
        })
      }else {
          alert("파일을 선택해 주세요.")
      }  

      return true
      },
    },
  }

</script>

<style>

</style>