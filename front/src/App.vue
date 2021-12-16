<template>
  <div id="app">
    <div id="nav">
      <span v-if="isLogin">
        <router-link to="/">Home</router-link> |
        <router-link to="/outcome">요금청구</router-link> |
        <router-link to="/income">수입입력</router-link> |
        <router-link to="/book">장부확인</router-link> |
        <router-link to="/board">자유게시판</router-link> |
        <router-link to="/manager">관리자용</router-link> |
        <router-link @click.native="logout" to="#">Logout</router-link>
      </span>
      <span v-else>
        <router-link to="/login">로그인</router-link> |
        <router-link to="/signup">회원가입</router-link>
      </span>
    </div>
    <router-view @login="isLogin=true"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  data: function() {
    return {
      isLogin: false,
    }
  },
  methods: {
    // 로그아웃을 위한 메소드
    logout: function() {
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.$store.dispatch('logout')
      this.$router.push({name:'Login'})
    }
  },
  computed:{
    ...mapState([
      'setToken',
    ]),
  },
  created: function() {
    // 1. Vue Instance 가 생성된 직후에 호출되어 JWT Token 가져오기
    const token = localStorage.getItem('jwt')
    // 2. Token 이 있으면
    if(token){
      // 3. True 로 변경하고 없으면 유지.
      this.isLogin = true
      this.$store.dispatch('setToken',token)
      this.$router.push({name:'Home'})
    }else{
      this.$router.push({name:'Login'})
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
