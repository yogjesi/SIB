import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const BACK_URL = 'http://127.0.0.1:8000'

import axios from 'axios'

export default new Vuex.Store({
  state: {
    currentUser:Object,
    manager:Object,
    tmpManager:false,
    accountant:Object,
    tmpAccountant:false,
    token:'',
    setToken:Object,
    boardList:[],
    boardDetail:{id:'',user:Object,title:'',content:'',created_at:'',updated_at:'',image:'',video:'',hits:''},
    userList:[],
    userWaitList:[],
    commentList:[],
    //book 더미 데이터
    // transactions: [
    //   {
    //     id: 1,
    //     day:'121',
    //     category: '활동비',
    //     content: '샌드위치',
    //     income: '',
    //     outcome: '10,000',
    //     balance: '30,000',
    //   },
    //   {
    //     id: 2,
    //     day:'122',
    //     category: '헌금',
    //     content: '일요미사',
    //     income: '100,000',
    //     outcome: '',
    //     balance: '130,000',
    //   },
    //   {
    //     id: 3,
    //     day:'123',
    //     category: '행사비',
    //     content: '치킨',
    //     income: '',
    //     outcome: '100,000',
    //     balance: '30,000',
    //   },
    // ]
  },
  mutations: {
    LOGIN: function(state,data){
      const config ={
        Authorization: `JWT ${data}`
      }
      state.token = data
      state.setToken = config
    },
    USERINFORMATION: function(state,data){
      state.currentUser=data
    },
    SETTOKEN: function(state,config){
      state.setToken=config
    },
    LOGOUT: function(state){
      state.setToken=Object
      state.currentUser=Object
    },
    BOARDLIST: function(state,data){
      state.boardList = data
    },
    BOARDDETAIL: function(state,data){
      state.boardDetail = data
    },
    BOARDSEARCH: function(state,data){
      state.boardList = data
    },
    COMMENTLIST: function(state,data){
      state.commentList=data
    },
    USERLIST: function(state,data){
      state.userList=data
    },
    MANAGER: function(state,data){
      state.manager= data
    },
    ACCOUNTANT: function(state,data){
      state.accountant = data
    },
    TMPACCOUNTANT: function(state){
      state.tmpAccountant = true
    },
    TMPMANAGER: function(state){
      state.tmpManager = true
    },
    USERWAITLIST: function(state,data){
      state.userWaitList = data
    },
    FILTER_DATE: function(state, myArray){
      console.log(myArray)
      state.boardList = myArray
    },
  },
  actions: {
    // 1. 로그인을 위한 actions
    login : function(context,credentials){
      axios({
        method: 'POST',
        url: `${BACK_URL}/accounts/api-token-auth/`,
        data: credentials,
      })
      .then(res =>{
        localStorage.setItem('jwt',res.data.token)
        context.commit('LOGIN',res.data.token)
        context.dispatch('userInformation')
      })
      .catch(err =>{
        console.log(err)
      })
    },
    // 1-1. 유저정보를 얻기위한 actions
    userInformation : function({commit}){
      axios({
        method: 'GET',
        url: `${BACK_URL}/accounts/userinfo`,
        headers: this.state.setToken
      })
      .then(res =>{
        commit('USERINFORMATION',res.data)
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
    },
    // 5. 자유 게시판 상세글 조회
    boardDetail: function({commit},pk){
      axios({
        method: 'GET',
        url: `${BACK_URL}/boards/${pk}`,
        headers: this.state.setToken
      })
      .then(res =>{
        if(res.data.image){
          const board = {
            ...res.data,
            image:`${BACK_URL}${res.data.image}`
          }
          commit('BOARDDETAIL',board)
        }else{
          commit('BOARDDETAIL',res.data)
        }
        
      })
      .catch(err =>{
        console.log(err)
      })
    },
    // 6. 자유게시판 검색
    boardSearch({commit},data){
      axios({
        method: 'POST',
        url: `${BACK_URL}/boards/search/`,
        data: data,
        headers: this.state.setToken
      })
      .then(res =>{
        commit('BOARDSEARCH',res.data)
        
      })
      .catch(err =>{
        alert(err.response.data)
      })
    },
    // 7. 자유게시판 삭제
    boardDelete(context,pk){
      axios({
        method: 'DELETE',
        url: `${BACK_URL}/boards/${pk}`,
        headers: this.state.setToken
      })
      .then(() =>{
        context.dispatch('boardList')
      })
      .catch(err =>{
        console.log(err)
      })
    },
    // 8. 글 수정에서 사진만 삭제
    photoDelete({commit},pk){
      const  boardItem = {
        ...this.state.boardDetail,
        image : null,
      }
      axios({
        method: 'PUT',
        url: `${BACK_URL}/boards/${pk}/`,
        data:boardItem,
        headers: this.state.setToken
      })
      .then((res) =>{
        commit('BOARDDETAIL',res.data)
      })
      .catch(err =>{
        console.log(err)
      })
    },
    // 9. 상세 글에서 댓글 조회
    commentList({commit},pk){
      axios({
        method: 'GET',
        url: `${BACK_URL}/boards/${pk}/comments`,
        headers: this.state.setToken
      })
      .then(res =>{
        commit('COMMENTLIST',res.data)
      })
      .catch(err =>{
        console.log(err)
      })
    },
    // 10. 댓글 생성
    commentCreate(context,data){
      // data[0] : 글 번호, [1]: 작성할 댓글 내용
      axios({
        method: 'POST',
        url: `${BACK_URL}/boards/${data[0]}/comments/`,
        data: {content:data[1]},
        headers: this.state.setToken
      })
      .then(() =>{
        context.dispatch('commentList',data[0])
      })
      .catch(err =>{
        console.log(err)
      })
    },
    // 11. 댓글 수정
    commentUpdate(context,data){
      // data[0] : commentItem, data[1] : 바뀔 댓글 내용
      const updateItem = {
        ...data[0],
        content : data[1]
      }
      axios({
        method: 'PUT',
        url: `${BACK_URL}/boards/comments/${data[0].id}/`,
        data:updateItem,
        headers: this.state.setToken
      })
      .then(() =>{
        context.dispatch('commentList',data[0].boards)
      })
      .catch(err =>{
        console.log(err)
      })

    },
    // 12. 댓글 삭제
    commentDelete(context,pk){
      // pk 0: 글 번호, 1: 댓글번호
      axios({
        method: 'DELETE',
        url: `${BACK_URL}/boards/comments/${pk[1]}/`,
        headers: this.state.setToken
      })
      .then(() =>{
        context.dispatch('commentList',pk[0])
      })
      .catch(err =>{
        console.log(err)
      })
    },
    // 13. 관리자페이지 유저 목록 조회
    userList({commit}){
      axios({
        method: 'GET',
        url: `${BACK_URL}/accounts/userlist/`,
        headers: this.state.setToken
      })
      .then(res =>{
        const userLength = res.data.length
        for (let i = 0; i<userLength; i++){
          if(res.data[i].authority == 3){
            commit('MANAGER',res.data[i])
          }else if(res.data[i].authority == 2){
            commit('ACCOUNTANT',res.data[i])
          }else if(res.data[i].authority == 4){
            commit('TMPACCOUNTANT')
          }else if(res.data[i].authority == 5){
            commit('TMPMANAGER')
          }
        }
        commit('USERLIST',res.data)
      })
      .catch(err =>{
        console.log(err)
      })
    },
    // 14. 관리자페이지 유저 목록 검색
    userSearch({commit},data){
      axios({
        method: 'POST',
        url: `${BACK_URL}/accounts/usersearch/`,
        data: data,
        headers: this.state.setToken
      })
      .then(res =>{
        commit('USERLIST',res.data)
        
      })
      .catch(err =>{
        alert(err.response.data)
      })
    },
    // 15. 회계 권한 위임 
    changeAccountant : function(context,data){
      axios({
        method: 'POST',
        url: `${BACK_URL}/accounts/confirm/`,
        data: data[0],
        headers: this.state.setToken
      })
      .then(() =>{
        const changeInfo = {
          current: data[2],
          future: data[1]
        }
        axios({
          method: 'POST',
          url: `${BACK_URL}/accounts/changeaccountant/`,
          data:  changeInfo,
          headers: this.state.setToken
        })
        .then(() =>{
          context.dispatch('userList')
        })
        .catch(err =>{
          console.log(err)
        })
      })
      .catch(err =>{
        alert(err.response.data)
      })
    },
    // 16. 임시 회계 권한 회수 
    cancelAccountant : function(context,data){
      axios({
        method: 'POST',
        url: `${BACK_URL}/accounts/confirm/`,
        data: data[0],
        headers: this.state.setToken
      })
      .then(() =>{
        axios({
          method: 'POST',
          url: `${BACK_URL}/accounts/cancelaccountant/`,
          data: {cancel: data[1]},
          headers: this.state.setToken
        })
        .then(() =>{
          this.state.tmpAccountant=false
          context.dispatch('userList')
        })
        .catch(err =>{
          console.log(err)
        })
      })
      .catch(err =>{
        alert(err.response.data)
      })
    },
    // 17. 회장 권한 위임 
    changeManager : function(context,data){
      axios({
        method: 'POST',
        url: `${BACK_URL}/accounts/confirm/`,
        data: data[0],
        headers: this.state.setToken
      })
      .then(() =>{
        const changeInfo = {
          current: data[2],
          future: data[1]
        }
        axios({
          method: 'POST',
          url: `${BACK_URL}/accounts/changemanager/`,
          data:  changeInfo,
          headers: this.state.setToken
        })
        .then(() =>{
          context.dispatch('userList')
        })
        .catch(err =>{
          console.log(err)
        })
      })
      .catch(err =>{
        alert(err.response.data)
      })
    },
    // 18. 임시 회장 권한 회수 
    cancelManager : function(context,data){
      axios({
        method: 'POST',
        url: `${BACK_URL}/accounts/confirm/`,
        data: data[0],
        headers: this.state.setToken
      })
      .then(() =>{
        axios({
          method: 'POST',
          url: `${BACK_URL}/accounts/cancelmanager/`,
          data: {cancel: data[1]},
          headers: this.state.setToken
        })
        .then(() =>{
          this.state.tmpManager=false
          context.dispatch('userList')
        })
        .catch(err =>{
          console.log(err)
        })
      })
      .catch(err =>{
        alert(err.response.data)
      })
    },
    userWaitList : function({commit}){
      axios({
        method: 'GET',
        url: `${BACK_URL}/accounts/userwaitlist/`,
        headers: this.state.setToken
      })
      .then(res =>{
        commit('USERWAITLIST',res.data)
      })
      .catch(err =>{
        console.log(err)
      })    
    },
    userApprove : function(context,pk){
      axios({
        method: 'PUT',
        url: `${BACK_URL}/accounts/userwait/${pk}/`,
        headers: this.state.setToken
      })
      .then(() =>{
        context.dispatch('userWaitList')
        context.dispatch('userList')
      })
      .catch(err =>{
        console.log(err)
      })
    },
    userRefuse : function(context,pk){
      axios({
        method: 'DELETE',
        url: `${BACK_URL}/accounts/userwait/${pk}/`,
        headers: this.state.setToken
      })
      .then(() =>{
        context.dispatch('userWaitList')
        context.dispatch('userList')
      })
      .catch(err =>{
        console.log(err)
      })
    },
    //actions : 
    filterDate:function ( {commit}, dateItem){
      axios({
        method: 'GET',
        url: `${BACK_URL}/boards/`,
        headers: this.state.setToken
      })
      .then(res =>{
        let myArray = ['와우']
        for(let i = 0; i < res.data.length; i++) {
          const yes = res.data[i].created_at
          console.log(yes)
          if ( dateItem[0] <= yes && yes <= dateItem[1] ){
            myArray.push(res.data[i])
          }
        }

        console.log(myArray)
        commit('FILTER_DATE', myArray)
      })
      },
    },  
  modules: {
  }
})
