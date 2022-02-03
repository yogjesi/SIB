import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const BACK_URL = 'https://ycjeil-youth.link'

import axios from 'axios'
import _ from 'lodash'
export default new Vuex.Store({
  state: {
    currentUser:Object,
    manager:Object,
    tmpManager:false,
    accountant:Object,
    tmpAccountant:false,
    setToken:Object,
    boardList:[],
    boardDetail:{id:'',user:Object,title:'',content:'',created_at:'',updated_at:'',image:'',video:'',hits:''},
    userList:[],
    idList:[],
    emailList:[],
    userWaitList:[],
    commentList:[],
    bookList:[],
    outcomes:[],
    selectOutcome : { "id":'', "user":Object, "category": "", "title": "", "content": "", "created_at": "", "datetime": '', "state": '', "out_money": '', "alarm": '', "receipt": ''},
    selectOutcome_state_str :'',
    outcome_comments:null,
    bibleList:'',
    incomes:[],
    selectIncome:  {id: "", category: "", title: "", content: "", in_money: "", created_at:"", datetime: ""},
    allBookList: [],
    lastBalance: 0,
 },
  mutations: {
    LOGIN: function(state,data){
      const config ={
        Authorization: `JWT ${data}`
      }
      state.setToken = config
    },
    ISLOGIN: function(state){
      state.isLogin= true
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
    IDLIST :function(state,data){
      state.idList = data
    },
    EMAILLIST : function(state,data){
      state.emailList = data
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
      state.bookList = myArray
    },
    GETOUTCOMES:function(state,data){
      state.outcomes = []
      data.forEach(data => {
        const outcome = {
          id: data.id,
          created_at: data.created_at,
          title: data.title,
          user: data.user.fullname,
          state: data.state,
        } 
        state.outcomes.push(outcome)  
      });
    },
    SELECT_OUTCOME:function(state,data){
      state.selectOutcome = data
      if(data.state == 1){
        state.selectOutcome_state_str = '승인대기'
      }else if(data.state == 2){
        state.selectOutcome_state_str = '승인'
      }else{
        state.selectOutcome_state_str = '반려'
      }
    },
    CHANGE_STATE:function(state,data){
      state.selectOutcome = data
      if(data.state == 1){
        state.selectOutcome_state_str = '승인대기'
      }else if(data.state == 2){
        state.selectOutcome_state_str = '승인'
      }else{
        state.selectOutcome_state_str = '반려'
      }
    },
    GETOUTCOME_COMMENT:function(state,data){
      state.outcome_comments = data
    },
    GET_INCOMES:function(state,data){
      state.incomes = []
      data.forEach(data => {
        const income = {
          id: data.id,
          in_money: data.in_money,
          category: data.category,
          title: data.title,
          datetime:data.datetime,
          created_at: data.created_at
        } 
        state.incomes.push(income)  
      });
    },
    SELECT_INCOME:function(state,data){
      state.selectIncome = data
    },
    BIBLELIST:function(state,data){
      state.bibleList = `${data.index} ${data.content}`
    },
    ALLBOOKLIST: function(state,account){
      state.allBookList = account
      state.bookList = account
    },
    LASTBALANCE: function(state,data){
      state.lastBalance = data
    }
  },
  actions: {
    // 0. 회원가입을 위한 actions
    signUp : function(context,contrial){
      axios({
        method: 'POST',
        url: `${BACK_URL}/accounts/signup/`,
        data: contrial,
      })
      .then(() =>{
      })
      .catch(err =>{
        console.log(err)
      })      
    },
    // 수입 입력
    // 1. 수입 목록 조회
    getIncomes: function ({commit}) {
      axios({
        method: 'get',
        url: `${BACK_URL}/books/income/`,
        headers: this.state.setToken
      })
        .then(res => {
          commit('GET_INCOMES',res.data) 
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 2. 수입 Detail 조회
    selectIncome: function ({commit},income_id) {
      axios({
        method: 'get',
        url: `${BACK_URL}/books/income/${income_id}/`,
        headers: this.state.setToken
      })
        .then(res => {
          commit('SELECT_INCOME',res.data) 
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 계정관리
    // 1. 로그인을 위한 actions
    login: function(context,credentials) {
      axios({
        method: 'POST',
        url: `${BACK_URL}/accounts/api-token-auth/`,
        data: credentials,
      })
      .then(res =>{
        localStorage.setItem('jwt',res.data.token)
        context.commit('LOGIN',res.data.token)
        context.dispatch('bibleList')
        context.dispatch('allBookList')
        context.dispatch('userInformation')
      })
      .catch(err =>{
        alert(err.response.data)
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
      commit('ISLOGIN')
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
            image:`${res.data.image}`
          }
          console.log(res.data.image)
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
      })
      .then(res =>{
        const userLength = res.data.length
        let idList = []
        let emailList = []
        for (let i = 0; i<userLength; i++){
          idList.push(res.data[i].username)
          emailList.push(res.data[i].email)
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
        commit('IDLIST',idList)
        commit('EMAILLIST',emailList)
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
    // 14-2. 유저 강퇴
    deleteUser: function(context,data){
      axios({
        method: 'POST',
        url: `${BACK_URL}/accounts/confirm/`,
        data: data[0],
        headers: this.state.setToken
      })
      .then(() =>{
        axios({
          method: 'DELETE',
          url: `${BACK_URL}/accounts/userdelete/${data[1]}`,
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

    //1. 장부 날짜 필터링
    filterDate:function ( {commit}, filterItems){
      let myArray = []
      let startDate = JSON.stringify(filterItems.startDate).slice(1,11)
      let endDate = JSON.stringify(filterItems.endDate).slice(1,11)
      let category = filterItems.categoryIds
      let allData = this.state.allBookList
      for(let i = 0; i < allData.length; i++) {
        const datetime = allData[i].datetime
        const out_cate = allData[i].category
        if ( startDate <= datetime && datetime <= endDate
          && category.includes(out_cate)
          ){
          myArray.push(allData[i])
          }
        }
      commit('FILTER_DATE', myArray)
    },
    //1. 장부를 모두 가져오자.
    allBookList:function ({commit}){
      // push 할 총 데이터 리스트
      let myAccount = []
      // axios를 한번에 두개쓰자!
      axios.all([
        // income(수입 불러오기)
        axios({
          method: 'GET',
          url: `${BACK_URL}/books/show/income`, 
          headers: this.state.setToken
        }),
        // outcome(지출 불러오기)
        axios({
          method: 'GET',
          url: `${BACK_URL}/books/show/outcome`, 
          headers: this.state.setToken
        })])
        .then(
          // 요청이 두개니까, 응답도 두개겠지? res1, res2 로 지정해서 사용하자.
          axios.spread((res1,res2)=>{
            var income = res1.data
            var outcome = res2.data
            income.sort(function(a, b) { 
              return a.datetime < b.datetime ? -1 : a.datetime > b.datetime ? 1 : 0
            })
            outcome.sort(function(a, b) { 
              return a.datetime < b.datetime ? -1 : a.datetime > b.datetime ? 1 : 0
            });
          // iindex : income index, oindex : outcome index
          let iindex = 0
          let oindex = 0
          let balance = 0
          // 퀵 정렬과 유사하다. datetime 이 더 빠른 친구를 앞으로 보내주자, 날짜 같을 경우 income 이 먼저
          while(iindex<income.length&&oindex<outcome.length){
            if(income[iindex].datetime<=outcome[oindex].datetime){
              balance += Number(income[iindex].in_money)
              const result = {
                ...income[iindex],
                balance: balance
              }
              myAccount.push(result)
              iindex++
            }else{
              balance -= Number(outcome[oindex].out_money)
              const result2 = {
                ...outcome[oindex],
                balance: balance
              }
              myAccount.push(result2)
              oindex++
            }
          }
          // 남아있는 친구를 다 털어내자. 어짜피 하나는 끝나겟지만, 둘중 뭐가 남을지 모르니까 둘 다 해주자. 
          // 어짜피, 있더라도 index가 끝났으면 바로 끝날테니까.
          for (;iindex<income.length;iindex++){
            balance += Number(income[iindex].in_money)
            const result = {
              ...income[iindex],
              balance: balance
            }
            myAccount.push(result)
          }
          for (;oindex<outcome.length;oindex++){
            balance -= Number(outcome[oindex].out_money)
            const result2 = {
              ...outcome[oindex],
              balance: balance
            }
            myAccount.push(result2)
          }
          // 총 장부가 완성되었다. 이를 vuex 에 저장해주자
          commit('ALLBOOKLIST',myAccount)
          // 우리는 총 잔액도 궁금하다. 이 잔액 역시도 vuex 에 저장해주자.
          commit('LASTBALANCE',myAccount[myAccount.length-1].balance)
        })
      ).catch((err)=>console.log(err))
    },
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
        url: `${BACK_URL}/books/outcome/${outcome_id}/`,
        headers: this.state.setToken
      })
        .then(res => {
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
        url: `${BACK_URL}/books/outcome/change_state/${this.state.selectOutcome.id}/`,
        headers: this.state.setToken,
        data:data
      })
        .then(res => {
          commit('CHANGE_STATE',res.data) 
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 4. 요금 청구 댓글 전체 조회
    getOutcomeComment:function ({commit},outcome_id) {
      axios({
        method: 'get',
        url: `${BACK_URL}/books/outcome/${outcome_id}/outcome_comment/`,
        headers: this.state.setToken
      })
        .then(res => {
          commit('GETOUTCOME_COMMENT',res.data) 
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 5. 성경 구절 API
    bibleList: function({commit}){
      axios({
        method: 'get',
        url: `${BACK_URL}/boards/bibles/`,
        headers: this.state.setToken
      })
      .then(res =>{
        commit('BIBLELIST',_.sampleSize(res.data)[0])
      })
      .catch(err => {
        console.log(err)
      })
    }  
  },
  modules: {
  }
})
