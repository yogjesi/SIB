<template>
  <div>
    <h1>Login</h1>
    <v-form
      class="container"
      ref="form"
      @submit.prevent="login">
      <v-text-field
        v-model="credentials.username"
        label="아이디"
        required
        :rules="usernameRule"/>
      <v-text-field
        v-model="credentials.password"
        label="비밀번호"
        autocomplete="off"
        required
        type="password"
        :rules="passwordRule"
        @keyup.enter="login"/>
      <v-btn
        id="login_btn"
        @click="login">
        로그인
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data: function() {
    return {
      credentials: {
        username: '',
        password: '',
      },
      usernameRule:[
        v => ! !v || '아이디를 입력해주세요',
      ],
      passwordRule:[
        v => ! !v || '비밀번호를 입력해주세요.',
      ],
    }
  },
  methods: {
    login: function() {
      // 유효성 검사를 위한 폼
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/accounts/login/`,
        data: this.credentials
      })
      .then(res =>{
        if(res.data.Success){
          if(res.data.is_active){
              this.$store.dispatch('login',this.credentials)
              this.$emit('login')
              if(this.$route.path!=='/Home') this.$router.push('/')
          }else{
            alert('관리자의 승인을 기다려주세요.')
          }
        }else{
          alert(res.data.error)
        }

      })
      .catch(err =>{
        alert(err.response.data)
      })
    },
  },
  
  created: function(){
    const token = localStorage.getItem('jwt')
    if(token){
      if(this.$route.path!=='/Home') this.$router.push('/')
    }
  }

}
</script>

<style>

</style>