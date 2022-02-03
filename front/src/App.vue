<template>
  <div id="app">
    <div>
      <b-navbar toggleable="md" type="dark" variant="dark" class="p-3">
        <div class="container-fluid">
          <!-- 브랜드 버튼 클릭해도 홈으로 가도록 설정 -->
          <b-navbar-brand><router-link class="main" to="/"><h3>영천제일교회 청년부</h3></router-link></b-navbar-brand>

          <!-- 네브바 카테고리들 -->
          <div id="nav">
            <span v-if="isLogin">
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-collapse class="justify-content-end" id="nav-collapse" is-nav>
                <b-navbar-nav>
                  <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
                  <b-nav-item><router-link to="/outcome">요금청구</router-link></b-nav-item>
                  <b-nav-item><router-link v-if="currentUser.authority==2 | this.currentUser.authority==4 | currentUser.is_superuser" to="/income">수입입력</router-link></b-nav-item>
                  <b-nav-item><router-link to="/book">장부 확인</router-link></b-nav-item>
                  <b-nav-item><router-link to="/board">자유게시판</router-link></b-nav-item>
                  <b-nav-item><router-link v-if="currentUser.authority==3 | this.currentUser.authority==5 | currentUser.is_superuser" to="/manager">관리자용</router-link></b-nav-item>
                  <b-nav-item><router-link @click.native="logout" to="#">Logout</router-link></b-nav-item>
                </b-navbar-nav>
              </b-collapse>
            </span>
            <span v-else>
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-collapse class="justify-content-end" id="nav-collapse" is-nav>
                <b-navbar-nav>
                  <b-nav-item><router-link to="/login">로그인</router-link></b-nav-item>
                  <b-nav-item><router-link to="/signup">회원가입</router-link></b-nav-item>
                </b-navbar-nav>
              </b-collapse>            
            </span>
          </div>
        </div>
      </b-navbar>
    </div>
    <router-view @login="isLogin=true"/>
    <!-- footer달아서 아랫쪽을 좀 더 보기 쉽게 해줌 -->
    <footer class="py-5"></footer>
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
      this.$store.dispatch('allBookList')
      this.$store.dispatch('bibleList')
      this.isLogin = true
    }else{
      this.$router.push({name:'Login'}).catch(()=>{});
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Jua&family=Merriweather:ital,wght@0,300;0,400;1,300;1,400&family=Noto+Serif+KR:wght@200;300;400&display=swap');
@font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');
@font-face {
    font-family: 'SANJUGotgam';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/SANJUGotgam.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Vitro_core';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Vitro_core.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
     font-family: 'locus_sangsang';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/locus_sangsang.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}

.main {
  text-decoration: none;
  font-family: 'SANJUGotgam';
  text-align: center;
  color: #b9d2e9;

}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  text-decoration: none;
}

#nav {
  padding: 1rem;

  a {
    font-weight: bold;
    color: #566574;
    text-decoration: none;
    font-family: 'NanumSquareRound';

    &.router-link-exact-active {
      color: #a7d4d8;
      text-decoration: none;
    }
  }
}

// 테이블 라인 맞추는 용도
td {
  text-align:start;
}

#mainpage {
  font-family: 'Gowun Batang', serif;
  // font-family: 'Vitro_core';
  padding-top: 3rem;
}

// title
#title {
  // font-family: 'Gowun Batang', serif;
  font-family: 'Vitro_core';
  // font-family: 'Jua', sans-serif;
  // font-family: 'Merriweather', serif;
  // font-family: 'Noto Serif KR', serif;
  font-weight: bold;
  margin-top: 3rem;
}
// subtitle
#subtitle {
  // font-family: 'Gowun Batang', serif;
  // font-family: 'Jua', sans-serif;
  // font-family: 'Merriweather', serif;
  // font-family: 'Vitro_core';
  font-family: 'Noto Serif KR', serif;
}

.subtitle {
  font-family: 'Noto Serif KR', serif; 
}

// inputtext
#inputtext {
  font-family: 'NanumSquareRound';
}
// btntext : 버튼용
#btntext {
  font-family: 'locus_sangsang';
}
#smallbtn {
  font-family: 'Jua', sans-serif;
}

#board {
  // font-family: 'Gowun Batang', serif;
  // font-family: 'Jua', sans-serif;
  // font-family: 'Merriweather', serif;
  // font-family: 'Noto Serif KR', serif;
  // font-family: 'NanumSquareRound';
  font-family: 'NanumSquare';
  font-weight: bolder;
}

#comment {
  // font-family: 'Gowun Batang', serif;
  // font-family: 'Jua', sans-serif;
  // font-family: 'Merriweather', serif;
  // font-family: 'Noto Serif KR', serif;
  font-family: 'NanumSquareRound';
  // font-family: 'NanumSquare';
  // font-weight: bolder;
}


</style>
