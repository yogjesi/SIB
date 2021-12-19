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
    outcomes:[],
    selectOutcome : null,
    selectOutcome_state_str :'',
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
    GETOUTCOMES:function(state,data){
      state.outcomes = []
      data.forEach(data => {
        const outcome = {
          id: data.id,
          created_at: data.created_at,
          content: data.content,
          user: data.user.username,
          state: data.state,
        } 
        state.outcomes.push(outcome)  
      });
    },
    SELECT_OUTCOME:function(state,data){
      console.log('store-SELECT_OUTCOME'+data.state)
      state.selectOutcome = data
      if(data.state == 1){
        state.selectOutcome_state_str = '승인대기'
      }else if(data.state == 2){
        state.selectOutcome_state_str = '승인'
      }else{
        state.selectOutcome_state_str = '반려'
      }
      console.log(state.selectOutcome_state_str)
    },
    CHANGE_STATE:function(state,data){
      console.log('store-CHANGE_STATE'+data.state)
      state.selectOutcome = data
      if(data.state == 1){
        state.selectOutcome_state_str = '승인대기'
      }else if(data.state == 2){
        state.selectOutcome_state_str = '승인'
      }else{
        state.selectOutcome_state_str = '반려'
      }
      console.log(state.selectOutcome_state_str)
    },

  },
  actions: {
    // 1. 요금 청구 목록 조회
    getOutcomes: function ({commit}) {
      axios({
        method: 'get',
        url: `${BACK_URL}/books/outcome/`,
        headers: this.state.setToken
      })
        .then(res => {
          commit('GETOUTCOMES',res.data) 
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 2. 요금 청구 Detail 조회
    selectOutcome: function ({commit},outcome_id) {
      axios({
        method: 'get',
        url: `${BACK_URL}/books/outcome/${outcome_id}`,
        headers: this.state.setToken
      })
        .then(res => {
          // console.log(res.data)
          commit('SELECT_OUTCOME',res.data) 
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 3. 요금 청구 Detail - 승인 상태 변경
    changeState:function({commit},statenum){
      const data = {
        ...this.state.selectOutcome,
        state:statenum
      }
      axios({
        method: 'put',
        url: `${BACK_URL}/books/outcome/change_state/${this.state.selectOutcome.id}`,
        headers: this.state.setToken,
        data:data
      })
        .then(res => {
          console.log(res.data)
          commit('CHANGE_STATE',res.data) 
        })
        .catch(err => {
          console.log(err)
        })
    },

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
