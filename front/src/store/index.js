import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const BACK_URL = 'http://127.0.0.1:8000'

import axios from 'axios'

export default new Vuex.Store({
  state: {
    token:'',
    setToken:Object,
    boardList:[],
  },
  mutations: {
    LOGIN: function(state,data){
      const config ={
        Authorization: `JWT ${data}`
      }
      state.token = data
      state.setToken = config
    },
    SETTOKEN: function(state,config){
      state.setToken=config
    },
    LOGOUT: function(state){
      state.setToken=Object
    },
    BOARDLIST: function(state,data){
      state.boardList = data
    },
  },
  actions: {
    // 1. 로그인을 위한 actions
    login : function({commit},credentials){
      axios({
        method: 'POST',
        url: `${BACK_URL}/accounts/api-token-auth/`,
        data: credentials,
      })
      .then(res =>{
        localStorage.setItem('jwt',res.data.token)
        commit('LOGIN',res.data.token)
      })
      .catch(err =>{
        console.log(err)
      })
    },
    // 2. token이 존재할 경우, setToken 을 만들어주자.
    setToken : function({commit},token){
      // jwt token 을 config 에 넣어서 넣어놔주자.
      const config ={
        Authorization: `JWT ${token}`
      }

      commit('SETTOKEN',config)
    },
    // 3. logout 
    logout : function ({commit}){
      commit('LOGOUT')
    },
    // 4. 자유게시판 조회
    boardList: function({commit}){
      axios({
        method: 'GET',
        url: `${BACK_URL}/boards/`,
        headers: this.state.setToken
      })
      .then(res =>{
        commit('BOARDLIST',res.data)
      })
      .catch(err =>{
        console.log(err)
      })
    }
  },
  modules: {
  }
})
