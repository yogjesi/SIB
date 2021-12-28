<template>
  <div>
    <h2>회장은 지원님꺼</h2>
    <table class="container">
      <thead>
        <tr>
          <th>아이디</th>
          <th>이름</th>
          <th>이메일주소</th>
          <th>한줄소개</th>
          <th>승인여부</th>
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
    <b-dropdown :text="search.searchType" class="m-md-2">
      <b-dropdown-item @click="searchType('아이디')">아이디</b-dropdown-item>
      <b-dropdown-item @click="searchType('이름')">이름</b-dropdown-item>
    </b-dropdown>
    <input 
      type="text"
      id="keyword"
      v-model="search.keyword"
      @keyup.enter="searchUser"
    >
    <b-button @click="searchUser">검색</b-button>
    <b-button @click="searchDefault">초기화</b-button>
    <p>현재 회장은 {{manager.fullname}} 입니다.</p>
    <p>현재 회계는 {{accountant.fullname}} 입니다.</p>
    <table class="container">
      <thead>
        <tr>
          <th>아이디</th>
          <th>이름</th>
          <th>이메일주소</th>
          <th>직책</th>
          <th>회원 강퇴</th>
          <th>회계 지정</th>
          <th>회장 위임</th>
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
      class="container"
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
      }
    }
  },
  methods:{
    searchType: function(data){
      this.search.searchType = data
    },
    searchUser: function(){
      if (this.search.keyword){
        this.$store.dispatch('userSearch',this.search)
        this.search.keyword = ''
      }else{
        alert('검색할 유저를 입력해주세요!')
      }
    },
    searchDefault: function(){
      this.$store.dispatch('userList')
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

</style>