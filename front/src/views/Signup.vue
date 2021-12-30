<template>
  <div>
    <v-form
      class="container"
      ref="form"
      @submit.prevent="signup">
      <v-text-field
        v-model="contrial.username"
        label="아이디"
        required
        :rules="usernameRule"/>
      <v-text-field
        v-model="contrial.email"
        label="이메일"
        required
        :disabled="emailValidationStart || emailValidationClear"
        :rules="emailRule"/>
      <b-button :disabled="emailAble || emailValidationStart || emailValidationClear" @click="emailValidation">이메일 인증</b-button>
      <v-text-field
        v-show="emailValidationStart"
        v-model="emailValidContent"
        label="인증코드"
        required
        :disabled="emailValidationClear"
        :rules="emailCodeRule"/>
      <b-button v-show="emailValidationStart" :disabled="emailConfirm || emailValidationClear" @click="emailComplete">{{emailState}}</b-button>
      <b-button v-show="emailValidationStart && !emailValidationClear" @click="emailTimerReset">리셋</b-button>
      <b-button v-show="emailValidationStart && !emailValidationClear" @click="emailCancel">취소</b-button>
      <span v-show="emailValidationStart && !emailValidationClear">{{minutes}}:{{seconds}}</span>
      <v-text-field
        v-model="contrial.fullname"
        label="이름"
        required
        type="text"
        :rules="fullnameRule"/>
      <v-text-field
        v-model="contrial.introduce"
        label="한 줄 소개를 해주세요."
        required
        type="text"
        :rules="introduceRule"/>
      <v-text-field
        v-model="contrial.password"
        label="비밀번호"
        autocomplete="off"
        required
        type="password"
        :rules="passwordRule"/>
      <v-text-field
        v-model="passwordConfirm"
        label="비밀번호 확인"
        autocomplete="off"
        required
        type="password"
        :rules="passwordConfirmRule"/>
      <v-btn
        id="signup_btn"
        @click="signup"
        @keyup.enter="signup">
        회원가입
      </v-btn>
    </v-form>
    <br>

  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  name:'Signup',
  data: function(){
    return {
      contrial:{
        username:'',
        password:'',
        fullname:'',
        contrial:'',
        email:'',
      },
      usernameRule:[
        v => ! !v || '아이디를 입력해주세요',
        v => /^[a-zA-Z0-9]*$/.test(v) || '아이디는 영문+숫자만 입력 가능합니다.',
        v => {
          const replaceV = v.replace(/(\s*)/g, '')
          const pattern = /^[a-zA-Z]$/
          return pattern.test(replaceV[0])  || '아이디의 첫글자는 영문자여야 합니다.'
        },
        v => { 
          const replaceV = v.replace(/(\s*)/g, '')
          return replaceV.length > 4 || '아이디는 4글자 이상이여야합니다.'
        },
        v=> {
          let eng = false
          let num = false
          for(let x=0; x<v.length ;x++){
            if (/^[a-zA-Z]$/.test(v[x]) && !eng){
              eng = true
            }
            if (/^[0-9]$/.test(v[x]) && !num){
              num = true
            }
          }
          return num && eng || '아이디는 영어와 숫자가 혼합되어야합니다.'
        },
        v => { 
          const replaceV = v.replace(/(\s*)/g, '')
          return replaceV.length < 12 || '아이디는 12글자 이하이여야합니다.'
        },
        v => ! this.idList.includes(v) ||'이미 사용중인 아이디입니다.',
      ],
      emailInput:{
        email:'',
        code: '',

      },
      emailValidationStart:false,
      emailTimer:{
        timerCounter: 180,
        timer: null,
        resetButton : false
      },
      emailState:'인증',
      emailCode:'',
      emailValidContent:'',
      emailValidationClear:false,
      emailRule:[
        v => !!v || '이메일을 입력해주세요.',
        v => { 
          const replaceV = v.replace(/(\s*)/g, '')
          const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[@][0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/
          return pattern.test(replaceV) || '이메일 형식으로 입력해주세요'
        },
        v => ! this.emailList.includes(v) ||'이미 사용중인 이메일입니다.',
      ],
      emailCodeRule:[
        v => !!v || '인증코드를 입력해주세요.',
        v => {
          return v == this.emailCode || '인증코드가 일치하지 않습니다.'
        }
      ],
      fullnameRule:[
        v => !!v || '이름을 입력해주세요.'
      ],
      introduceRule:[
        v => !!v || '자기소개를 입력해주세요.'
      ],
      passwordConfirm:'',
      passwordRule:[
        v => ! !v || '비밀번호를 입력해주세요.',
        v => { 
          const replaceV = v.replace(/(\s*)/g, '')
          return replaceV.length >= 6 || '비밀번호는 6글자 이상이여야합니다.'
        },
        v=> {
          let eng = false
          let num = false
          for(let x=0; x<v.length ;x++){
            if (/^[a-zA-Z]$/.test(v[x])){
              eng = true
            }
            if ( /^[0-9]$/.test(v[x])){
              num = true
            }
          }
          return eng&&num || '영어와 숫자를 적절히 섞어야합니다.'
        },
        v => { 
          const replaceV = v.replace(/(\s*)/g, '')
          return replaceV.length < 20 || '비밀번호는 20글자 이하이여야합니다.'
        },

      ],
      passwordConfirmRule:[
        v => ! !v || '비밀번호를 한번 더 입력해주세요.',
        v => this.contrial.password ===v || '패스워드가 일치하지 않습니다.'

      ],
    }
  },
  methods:{
    // 이메일 유효성 검사 시작시, 타이머 활성화
    emailTimerStart:function(){
      // 1초에 한번씩 start 호출하자.
      this.emailTimer.timerCounter = 3*60
      this.emailTimer.timer = setInterval(() =>
      this.countdown(),1000)
    },
    emailTimerReset: function() {
      this.emailTimer.timerCounter = 3*60
      // clearInterval(this.emailTimer.timer)
      this.emailTimer.timer = null
    },
    // 시간 형식 2자리로 변경
    padTime: function(time){
      return (time<10? '0':'') + time
    },
    countdown: function() {
      if(this.emailTimer.timerCounter>=1){
        this.emailTimer.timerCounter-=1
      }else{
        this.emailTimer.timerCounter = 0
      }
    },
    // 이메일 유효성을 검사하기 위한 것.
    emailValidation: function() {
      this.emailValidationStart = !this.emailValidationStart
      this.emailInput.email= this.contrial.email
      this.emailTimerStart()
      this.emailCode = _.sampleSize(_.range(1000,9999))[0]
      this.emailInput.code = this.emailCode

      axios.post('https://8q1q1n9dyl.execute-api.us-east-1.amazonaws.com/default/projectmailsend', JSON.stringify(this.emailInput))
        .then(() => {
        })
        .catch(() => {
        })
    },
    emailCancel: function() {
      this.emailValidationStart = !this.emailValidationStart
      this.contrial.email = ''
      this.emailCode = ''
      this.emailValidContent = ''
      clearInterval(this.emailTimer.timer)

    },
    emailComplete: function() {
      this.emailState='완료'
      this.emailValidationClear = true
      clearInterval(this.emailTimer.timer)
    },
    signup:function(){
      const validate = this.$refs.form.validate()

      if(validate){
        this.$store.dispatch('signUp',this.contrial)
        alert('회원가입이 완료되었습니다! 관리자의 승인을 기다려주세요!')
        this.$router.push({name:'Login'})
      }else{
        if(!this.emailCode || this.emailCode!=this.emailValidContent){
          alert('이메일 인증을 완료해주세요!')
        }
      }
    }
  },
  computed:{
    ...mapState([
      'idList','emailList',
    ]),
    emailVali() {
      const email = this.contrial.email
      const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[@][0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/
      return pattern.test(email)
    },
    emailAble() {
      if(this.contrial.email && this.emailVali && !this.emailList.includes(this.contrial.email) && !this.emailValidationStart){
        return false
      }else{
        return true
      }
    },
    emailConfirm:function(){
      if(this.emailCode==this.emailValidContent){
        return false
      }else{
        return true
      }
    },
    minutes: function() {
      const minutes = Math.floor(this.emailTimer.timerCounter / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = this.emailTimer.timerCounter - (this.minutes * 60);
      return this.padTime(seconds);
    }
  },
  created: function(){
    this.$store.dispatch('userList')
    const token = localStorage.getItem('jwt')
    if(token){
      if(this.$route.path!=='/') this.$router.push('/')
    }
  }

}
</script>

<style>

</style>