<template>
  <div>
    <v-card>
        <div class="file-upload">
        <form @submit.prevent="formSubmit" method="post">
          <br>
          <div class="m-2">
            <select id="form-select" class="form-select" aria-label="Default select example">
              <option selected value="event">사업행사비</option>
              <option value="activity">활동비</option>
              <option value="celebrity">경조비</option>
              <option value="transportation">교통비</option>
              <option value="fixtures">소모품비</option>
              <option value="etc">기타</option>
            </select>
          </div>
          <br>

        <div class="m-2">
          <div>지출 내역</div>
              <input type="text"  class="border m-2"
                placeholder="김밥"
                v-model.trim="inputTitle"
              >
        </div>
        <br>
        <div class="m-2">
          <div>지출 금액</div>
              <input type="text"  class="border m-2"
                placeholder="금액"
                v-model.trim="inputMoney"
              >
        </div>
        
        <br>
        <div class="m-2">
          <div>지출 일시</div>
              <input type="date"  class="border m-2"
                pattern="\d{4}-\d{2}-\d{2}"
                required
                v-model.trim="inputDatetime"
              >
        </div>
        <br>
        <br>
        <div class="m-2">
          <div>지출 상세 내역 </div>
              <input type="text"  class="border m-2"
                placeholder="금액"
                v-model.trim="inputContent"
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
          <input type="file" ref="selectFile" @change="previewFile" />
          
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
      isAlarm:null,
      options:[
      'event',
      'activity',
      'celebrity',
      'transportation',
      'fixtures',
      'etc'
      ],
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
      let form = new FormData()
      if (this.selectFile) {
        // Form 필드 생성
        form.append("receipt", this.selectFile) // api file name
        this.isUploading = true

        var selectCategory = document.querySelector('#form-select').value

        form.append("category",selectCategory)
        form.append("title",this.inputTitle)
        form.append("content",this.inputContent)
        form.append("money",this.inputMoney)
        form.append("datetime",this.inputDatetime)
        form.append("alarm",this.isAlarm)

        const token = localStorage.getItem('jwt')
        http
          .post("http://127.0.0.1:8000/books/outcome/", form, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization":`JWT ${token}`
            },
          })
          .then(res => {
            this.response = res
            this.$router.push({ name: 'Outcome' })
            this.isUploading = false
          })
          .catch(error => {
            this.response = error
            this.isUploading = false
          })
        }
       else {
        alert("파일을 선택해 주세요.")
      }

      return true
      },
    },
  }

</script>

<style>

</style>