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
        state.selectOutcome_state_str = '????????????'
      }else if(data.state == 2){
        state.selectOutcome_state_str = '??????'
      }else{
        state.selectOutcome_state_str = '??????'
      }
    },
    CHANGE_STATE:function(state,data){
      state.selectOutcome = data
      if(data.state == 1){
        state.selectOutcome_state_str = '????????????'
      }else if(data.state == 2){
        state.selectOutcome_state_str = '??????'
      }else{
        state.selectOutcome_state_str = '??????'
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
    // 0. ??????????????? ?????? actions
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
    // ?????? ??????
    // 1. ?????? ?????? ??????
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
    // 2. ?????? Detail ??????
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

    // ????????????
    // 1. ???????????? ?????? actions
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
    // 1-1. ??????????????? ???????????? actions
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
    // 2. token??? ????????? ??????, setToken ??? ???????????????.
    setToken : function({commit},token){
      // jwt token ??? config ??? ????????? ???????????????.
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
    // 4. ??????????????? ??????
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
    // 5. ?????? ????????? ????????? ??????
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
    // 6. ??????????????? ??????
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
    // 7. ??????????????? ??????
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
    // 8. ??? ???????????? ????????? ??????
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
    // 9. ?????? ????????? ?????? ??????
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
    // 10. ?????? ??????
    commentCreate(context,data){
      // data[0] : ??? ??????, [1]: ????????? ?????? ??????
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
    // 11. ?????? ??????
    commentUpdate(context,data){
      // data[0] : commentItem, data[1] : ?????? ?????? ??????
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
    // 12. ?????? ??????
    commentDelete(context,pk){
      // pk 0: ??? ??????, 1: ????????????
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
    // 13. ?????????????????? ?????? ?????? ??????
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
    // 14. ?????????????????? ?????? ?????? ??????
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
    // 14-2. ?????? ??????
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
    // 15. ?????? ?????? ?????? 
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
    // 16. ?????? ?????? ?????? ?????? 
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
    // 17. ?????? ?????? ?????? 
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
    // 18. ?????? ?????? ?????? ?????? 
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

    //1. ?????? ?????? ?????????
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
    //1. ????????? ?????? ????????????.
    allBookList:function ({commit}){
      // push ??? ??? ????????? ?????????
      let myAccount = []
      // axios??? ????????? ????????????!
      axios.all([
        // income(?????? ????????????)
        axios({
          method: 'GET',
          url: `${BACK_URL}/books/show/income`, 
          headers: this.state.setToken
        }),
        // outcome(?????? ????????????)
        axios({
          method: 'GET',
          url: `${BACK_URL}/books/show/outcome`, 
          headers: this.state.setToken
        })])
        .then(
          // ????????? ????????????, ????????? ????????????? res1, res2 ??? ???????????? ????????????.
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
          // ??? ????????? ????????????. datetime ??? ??? ?????? ????????? ????????? ????????????, ?????? ?????? ?????? income ??? ??????
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
          // ???????????? ????????? ??? ????????????. ????????? ????????? ???????????????, ?????? ?????? ????????? ???????????? ??? ??? ?????????. 
          // ?????????, ???????????? index??? ???????????? ?????? ???????????????.
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
          // ??? ????????? ???????????????. ?????? vuex ??? ???????????????
          commit('ALLBOOKLIST',myAccount)
          // ????????? ??? ????????? ????????????. ??? ?????? ????????? vuex ??? ???????????????.
          commit('LASTBALANCE',myAccount[myAccount.length-1].balance)
        })
      ).catch((err)=>console.log(err))
    },
    // 1. ?????? ?????? ?????? ??????
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
    // 2. ?????? ?????? Detail ??????
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
    // 3. ?????? ?????? Detail - ?????? ?????? ??????
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
    // 4. ?????? ?????? ?????? ?????? ??????
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
    // 5. ?????? ?????? API
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
