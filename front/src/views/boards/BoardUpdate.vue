<template>
  <div id="title" class="col col-md-8 offset-md-2">
    <h2>글 작성하기</h2>
    <form id="inputtext" @submit.prevent="formSubmit" method="post">
      <input class="form-control"
        placeholder="제목"
        type="text"
        v-model="board.title"><br>
      <p><textarea id="inputtext"
            class="form-control"
            placeholder="내용을 입력해주세요."
            rows= 10,
            cols= 50,
            v-model.trim="board.content" 
          >
          </textarea></p>
      <input class="form-control"
        placeholder="첨부할 youtube 주소"
        type="text"
        v-model="board.video"><br>
      
      <img v-if="previewImgUrl" :src="previewImgUrl" style="width:50%"/>
      <input class="form-control" type="file" ref="selectFile" @change="previewFile" />
      <b-button @click="photoDelete(board.id)">사진 삭제</b-button>
      <div class="container">
        <div class="row">
          <button class="btn btn-secondary my-3" type="submit" :disabled="isUploading">글 수정하기</button>
        </div>
      </div>
    </form>
    
  </div>
</template>

<script>
import http from "@/http"
import {mapState} from 'vuex'
export default {
  name:'BoardUpdate.vue',
  data:function(){
    return {
      board:Object,
      selectFile: null, // 파일 객체
      previewImgUrl: null, // 미리보기 이미지 URL
      isUploading: false, // 파일 업로드 체크
      response: null, // 파일 업로드후 응답값
    }
  },
  computed:{
    ...mapState([
      'boardDetail'
    ])
  },
  methods: {
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
        }
      } else {
        // 파일을 선택하지 않았을때
        this.selectFile = null
      }
    },

    async formSubmit() {
      if(!this.board.title){
        alert("제목을 입력해주세요")
      }
      if(!this.board.content){
        alert("내용을 입력해주세요")
      }
      if (this.board.title && this.board.content) {
        let form = new FormData()
        if(this.selectFile){
          form.append("image", this.selectFile) // api file name
        }
        
        form.append("title",this.board.title)
        form.append("content",this.board.content)
        form.append("video",this.board.video)
        this.isUploading = true
        http
          .put(`/boards/${this.board.id}/`, form, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `JWT ${localStorage.getItem('jwt')}`
            },
          })
          .then(res => {
            this.response = res
            this.isUploading = false
            this.$router.push({name:"BoardDetail",params:{boardPk:res.data.id}})
          })
          .catch(error => {
            this.response = error
            this.isUploading = false
          })
      }
    },
    photoDelete: function(pk){
      this.$store.dispatch('photoDelete',pk)
      this.previewImgUrl = null
    }
  },
  created: function(){
    this.board = this.boardDetail
    if (this.board.image){
      this.previewImgUrl = this.board.image
    }
  }

}
</script>

<style>

</style>