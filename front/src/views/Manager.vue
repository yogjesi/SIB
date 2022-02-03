<template>
  <div class="col col-md-10 offset-md-1">
    <div id="title">
      <h2>관리자용</h2>
    </div>
    <table id="board" class="container-fluid table table-striped">
      <thead>
        <tr>
          <th style="text-align:start;">아이디</th>
          <th style="text-align:start;">이름</th>
          <th style="text-align:start;">이메일주소</th>
          <th style="text-align:start;">한줄소개</th>
          <th style="text-align:start;">승인여부</th>
        </tr>
      </thead>
      <tbody v-if="userWaitList">
        <the-user-wait-item v-for="(user,index) in userWaitList" 
          :key="index"
          :user-wait="user"
        >
        </the-user-wait-item>
      </tbody>
    </table>
    <hr>
    <div class="d-flex justify-content-center">
      <b-input-group class="col col-md-6 mt-5">
        <template #prepend>
          <b-dropdown id="btntext" style="width:6rem;" variant="info" :text="search.searchType" >
            <b-dropdown-item @click="searchType('아이디')">아이디</b-dropdown-item>
            <b-dropdown-item @click="searchType('이름')">이름</b-dropdown-item>
          </b-dropdown>
        </template>
        <input 
          type="text"
          id="keyword"
          class="form-control"
          v-model="search.keyword"
          @keyup.enter="searchUser"
        >
        <template #append>
          <b-button id="btntext" style="width:5rem;" variant="primary" @click="searchUser">검색</b-button>
        </template>
      </b-input-group>
    </div>
    <div id="board" v-if="searchWord">
      <h5>검색어 : {{ searchWord }}</h5>
    </div>

    <b-button id="btntext" class="btn-outline-success my-3" variant="none" @click="searchDefault">초기화</b-button>
    
    <div id="subtitle">
      <h5>현재 <span>회장</span>은 <span>{{manager.fullname}}</span> 입니다.</h5>
      <h5>현재 <span>회계</span>는 <span>{{accountant.fullname}}</span> 입니다.</h5>
    </div>

    <table id="board" class="container-fluid table table-hover">
      <thead>
        <tr>
          <th style="text-align:start;">아이디</th>
          <th style="text-align:start;">이름</th>
          <th style="text-align:start;">이메일주소</th>
          <th style="text-align:start;">직책</th>
          <th style="text-align:start;">회원 강퇴</th>
          <th style="text-align:start;">회계 지정</th>
          <th style="text-align:start;">회장 위임</th>
        </tr>
      </thead>
      <tbody v-if="userList">
        <the-user-item v-for="(user,index) in paginatedData" 
          :key="index"
          :user-item="user"
        >
        </the-user-item>
      </tbody>
    </table>

    <b-pagination
      class="container-fluid d-flex justify-content-center my-5"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import TheUserWaitItem from '@/components/manager/TheUserWaitItem'
import TheUserItem from '@/components/manager/TheUserItem'
export default {
  name:'Manager',
  data: function() {
    return {
      perPage: 10,
      currentPage: 1,
      pageNum:0,
      search:{
        searchType:'아이디',
        keyword:''
      },
      searchWord:null
    }
  },
  methods:{
    searchType: function(data){
      this.search.searchType = data
    },
    searchUser: function(){
      if (this.search.keyword){
        this.$store.dispatch('userSearch',this.search)
        this.searchWord = this.search.keyword
        this.search.keyword = ''
      }else{
        alert('검색할 유저를 입력해주세요!')
      }
    },
    searchDefault: function(){
      this.$store.dispatch('userList')
      this.searchWord = ''
    }
  },
  computed: {
    ...mapState([
      'currentUser','userList','userWaitList','manager','accountant'
    ]),
    rows() {
      return this.userList.length
    },
    paginatedData () {
      const start = (this.currentPage-1) * this.perPage,
            end = start + this.perPage;
      return this.userList.slice(start, end);
    },
  },
  components:{
    TheUserItem,
    TheUserWaitItem
  },
  created: function(){
    if (this.currentUser.authority==3 | this.currentUser.authority==5 | this.currentUser.is_superuser){
      this.$store.dispatch('userList')
      this.$store.dispatch('userWaitList')
    }else{
      this.$router.push({name:'Home'})
    }
    
  }
}
</script>

<style>

span {
  font-weight: bolder;
}

</style>