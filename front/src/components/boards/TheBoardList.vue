<template>
  <div class="overflow-auto">

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table
      id="my-table"
      :items="boardList"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
    <table>
      <thead>
        <tr>
          <th>글번호</th>
          <th>제목</th>
          <th>글 작성자</th>
          <th>글 작성시간</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="p in paginatedData" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.title }}</td>
            <td>{{ p.user.fullname}}</td>
            <td>{{ p.created_at}}</td>
        </tr> -->
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
      perPage: 3,
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