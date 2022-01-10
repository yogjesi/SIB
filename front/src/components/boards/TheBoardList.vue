<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>글 작성자</th>
          <th>글 작성시간</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody v-if="boardList">
        <the-board-list-item v-for="(board,index) in paginatedData" 
          :key="index"
          :board-item="board"
        >
        </the-board-list-item>
      </tbody>
    </table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import TheBoardListItem from '@/components/boards/TheBoardListItem'
export default {
  name:'TheBoardList',
  data: function() {
    return {
      perPage: 10,
      currentPage: 1,
      pageNum:0
    }
  },
  props:{
    boardList:{
      type: Array,
      required: true,
    },
  },
  computed: {
    rows() {
      return this.boardList.length
    },
    paginatedData () {
      const start = (this.currentPage-1) * this.perPage,
            end = start + this.perPage;
      return this.boardList.slice(start, end);
    },
  },
  components:{
    TheBoardListItem,
  },
}
</script>

<style>

</style>