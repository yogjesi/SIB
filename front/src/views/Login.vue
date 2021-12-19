<template>
  <div>
    <h1>Login</h1>
    <form action="#">
      <div>
        <label for="username">아이디: </label>
        <input 
          type="text"
          id="username"
          v-model="credentials.username"
        >
      </div>
      <div>
        <label for="password">비밀번호: </label>
        <input 
          type="password"
          id="password"
          autoComplete="on"
          v-model="credentials.password"
          @keyup.enter="login"
        >
      </div>
      <button @click="login">로그인</button>
    </form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Login',
  data: function() {
    return {
      credentials: {
        username: null,
        password: null,
      }
    }
  },
  methods: {
    login: function (){
      this.$store.dispatch('login',this.credentials)
      this.$emit('login')
      this.$router.push({name:'Home'})
    }
  },
  computed: {
    ...mapState([
    'token',
   ]),
  }

}
</script>

<style>

</style>