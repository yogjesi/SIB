<template>
  <div>
    <v-card>
        <div class="file-upload">
        <form @submit.prevent="formSubmit" method="post">
          <br>
          <div class="m-2">
            <select v-model="outcome.category" id="form-select" class="form-select" aria-label="Default select example">
              <option value="사업행사비">사업행사비</option>
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
              <input type="text"  class="border m-2"
                placeholder="김밥"
                v-model.trim="outcome.title"
              >
        </div>
        <br>
        <div class="m-2">
          <div>지출 금액</div>
              <input type="text"  class="border m-2"
                placeholder="금액"
                v-model.trim="outcome.out_money"
              >
        </div>
        
        <br>
        <div class="m-2">
          <div>지출 일시</div>
              <input type="date"  class="border m-2"
                pattern="\d{4}-\d{2}-\d{2}"
                required
                v-model.trim="outcome.datetime"
              >
        </div>
        <br>
        <br>
        <div class="m-2">
          <div>지출 상세 내역 </div>
              <input type="text"  class="border m-2"
                placeholder="상세 내역을 입력해주세요 ex)언제, 어디서, 누구와"
                v-model.trim="outcome.content"
              >
        </div>
        <br>
        <div class="m-2">
          <div>알림 여부</div>
          <label><input type="radio" name="true" value="true" v-model.trim="outcome.alarm"> Yes</label>
          <label class="m-5"><input type="radio" name="false" value="false" v-model.trim="outcome.alarm" checked> No</label>
          <br>
        </div>

        <div class="m-2"> 
        <br>
          <div>영수증 첨부</div>
          <!-- <input type="file" ref="selectFile" @change="previewFile" /> -->
          <!-- <img v-if="previewImgUrl" :src="previewImgUrl" /> -->
          
          <img v-if="previewImgUrl" :src="`https:/jwsh.link${previewImgUrl}`" style="width:50%"/>
          <input class="form-control" type="file" ref="selectFile" @change="previewFile" />
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
import {mapState} from 'vuex'

export default {
  name:'OutcomeUpdate',
  data:function(){
    return{
      outcome:Object,
      // inputTitle:null,
      // inputContent:null,
      // inputMoney:null,
      // inputDatetime:null,
      // isAlarm:null,
      selectFile: null, // 파일 객체
      previewImgUrl: null, // 미리보기 이미지 URL
      isUploading: false, // 파일 업로드 체크
      response: null, // 파일 업로드후 응답값
    }
  },
  computed:{
    ...mapState([
      'selectOutcome'
    ])
  },
  created: function(){
    this.outcome = this.selectOutcome
    this.previewImgUrl = this.outcome.receipt
    // this.selectFile = this.outcome.receipt
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
            ["jpeg", "png", "gif", "bmp"].includes(fileExt) &&
            this.selectFile.size <= 1048576
          ) {
            // FileReader 를 활용하여 파일을 읽는다
            var reader = new FileReader()
            reader.onload = e => {
              // base64
              this.previewImgUrl = e.target.result
            }
            reader.readAsDataURL(this.selectFile)
          } else if (this.selectFile.size <= 1048576) {
            // 이미지외 파일
            this.previewImgUrl = null
          } else {
            alert("파일을 다시 선택해 주세요.")
            this.selectFile = null
            // this.previewImgUrl = null
          }
        } else {
          // 파일을 선택하지 않았을때
          this.selectFile = null
          // this.previewImgUrl = null
        }
        console.log(this.selectFile)
      },

    async formSubmit() {
      let form = new FormData()
      if (this.selectFile) {
        // Form 필드 생성
        form.append("receipt", this.selectFile) // api file name        
      } 
      //else {
        // alert("파일을 선택해 주세요.")
      //   form.append("receipt", this.previewImgUrl) 
      // }
      var selectCategory = document.querySelector('#form-select').value
      if (selectCategory){
        form.append("category",selectCategory)
      }else{
        alert("카테고리를 선택해 주세요.")
      }
      if (this.outcome.title){
        form.append("title",this.outcome.title)
      }else{
        alert("지출내역을 입력해 주세요.")
      }
      if (this.outcome.content){
        form.append("content",this.outcome.content)
      }else{
        alert("지출상세내역을 입력해 주세요.")
      }
      if (this.outcome.out_money){
        form.append("out_money",this.outcome.out_money)
      }else{
        alert("지출금액을 입력해 주세요.")
      }
      if (this.outcome.datetime){
        form.append("datetime",this.outcome.datetime)
      }else{
        alert("지출일시을 골라주세요.")
      }
      
      form.append("alarm",this.outcome.alarm)
      
      const token = localStorage.getItem('jwt')
      http
        .put(`books/outcome/${this.$route.params.id}/`, form, {
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

      return true
      },
    },
  }

</script>

<style>

</style>