<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <span v-if="isLogin">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/outcome">요금청구</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/income">수입입력</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/book">장부확인</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/board">자유게시판</router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="currentUser.authority==3 | this.currentUser.authority==5 | currentUser.is_superuser" to="/manager">관리자용</router-link> 
              </li>
              <li class="nav-item">
                <router-link @click.native="logout" to="#">Logout</router-link>  
              </li>
            </ul>                      
          </span>
          <span v-else>
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/login">로그인</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/signup">회원가입</router-link>
              </li>
            </ul>     
          </span>
        </div>
      </div>
    </nav>
          <!-- <div id="nav">
            <span v-if="isLogin">
              <router-link to="/">Home</router-link>
              <router-link to="/outcome">요금청구</router-link>
              <router-link to="/income">수입입력</router-link>
              <router-link to="/book">장부확인</router-link>
              <router-link to="/board">자유게시판</router-link>
              <router-link v-if="currentUser.authority==3 | this.currentUser.authority==5 | currentUser.is_superuser" to="/manager">관리자용</router-link> 
              <span v-if="currentUser.authority==3 | this.currentUser.authority==5 | currentUser.is_superuser"> | </span>
              <router-link @click.native="logout" to="#">Logout</router-link>
            </span>
            <span v-else>
              <router-link to="/login">로그인</router-link> |
              <router-link to="/signup">회원가입</router-link>
            </span>
          </div> -->
    <router-view @login="isLogin=true"/> 
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  data: function() {
    return {
      isLogin:false
    }
  },
  methods: {
    logout: function() {
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.$store.dispatch('logout')
      // location.reload()
      this.$router.push({name:'Login'})
    }
  },
  computed:{
    ...mapState([
      'setToken','currentUser',
    ]),
  },
  created: function() {
    // 1. Vue Instance 가 생성된 직후에 호출되어 JWT Token 가져오기
    const token = localStorage.getItem('jwt')
    // 2. Token 이 있으면
    if(token){
      // 3. True 로 변경하고 없으면 유지.
      this.$store.dispatch('setToken',token)
      this.$store.dispatch('userInformation')
      this.isLogin = true
    }else{
      this.$router.push({name:'Login'}).catch(()=>{});
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

.font {
  font-family: 'Black Han Sans', sans-serif;
  font-family: 'Do Hyeon', sans-serif;
  font-family: 'Gowun Batang', serif;
  font-family: 'Gowun Dodum', sans-serif;
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-family: 'Jua', sans-serif;
  font-family: 'Libre Baskerville', serif;
  font-family: 'Nanum Myeongjo', serif;
  font-family: 'Noto Serif', serif;
  font-family: 'Patua One', cursive;
  }
</style>
