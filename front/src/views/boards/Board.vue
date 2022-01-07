<template>
  <div class="containter-fluid">
    <div id="subtitle">
      <h2>자유게시판</h2>
    </div>
    <div class="col col-md-8 offset-md-2">
      <b-input-group>
        <template #prepend>
          <b-dropdown :text="search.searchType" variant="success" style="width:6rem;">
            <b-dropdown-item @click="searchType('제목')">제목</b-dropdown-item>
            <b-dropdown-item @click="searchType('내용')">내용</b-dropdown-item>
            <b-dropdown-item @click="searchType('작성자')">작성자</b-dropdown-item>
          </b-dropdown>
        </template>

        <input 
          type="text"
          id="keyword"
          v-model="search.keyword"
          @keyup.enter="searchBoard"
          class="form-control"
        >
        <template #append>
          <b-button @click="searchBoard" variant="primary" style="width:5rem;">검색</b-button>
        </template>
        
        <p v-if="boardList==false">검색 한 내용이 존재하지 않습니다.</p>
      </b-input-group>
      <!-- 글 작성 버튼은 오른쪽으로 보내버려야지 -->
      <br>
      <div style="display:flex; justify-content:flex-end"><b-button @click="boardCreate">글 작성</b-button></div>
      
      <!-- <b-table striped hover><the-board-list :board-list="boardList"></the-board-list></b-table> -->
      
      <the-board-list :board-list="boardList"></the-board-list>
    </div>


  </div>
</template>

<script>
import TheBoardList from '@/components/boards/TheBoardList'
import {mapState} from 'vuex'
export default {
  name: 'Boards',
  data: function() {
    return {
      search:{
        searchType:'제목',
        keyword:''
      }
      
    }
  },
  methods:{
    searchType: function(data){
      this.search.searchType = data
    },
    searchBoard: function(){
      if (this.search.keyword){
        this.$store.dispatch('boardSearch',this.search)
        this.search.keyword = ''
      }else{
        alert('검색할 내용을 입력해 주세요!')
      }
    },
    boardCreate: function(){
      this.$router.push({name:"BoardCreate"})
    },
  },
  computed:{
    ...mapState([
      'boardList'
    ])
  },
  created: function() {
    this.$store.dispatch('boardList')
  },
  components:{
    TheBoardList,
  }
}
</script>

<style>

</style>
