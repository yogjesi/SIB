<template>
  <div class="container">
    <!-- <table>
      <thead>
        <tr>
          <th>글번호</th>
          <th>제목</th>
          <th>글 작성시간</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody v-if="incomeList">
        <the-income-list-item v-for="(income, index) in paginatedData"
        :key="index"
        :income-item="income">
        </the-income-list-item>
      </tbody>
    </table>
    <b-pagination
    v-model="currentPage"
    :total-rows="rows"
    :per-page="perPage"
    aria-controls="my-table"
    ></b-pagination> -->
  </div>
</template>

<script>
// import TheIncomeListItem from '@/components/income/TheIncomeListItem'
// export default {
//   name:'TheIncomeList',
//   data: function() {
//     return {
//       perPage: 10,
//       currentPage:1,
//       pageNum:0
//     }
//   },
//   components: {
//     TheIncomeListItem,
//   },
//   computed: {
//     rows() {
//       const start = (this.currentPage-1)*this.perPage,
//       end = start + this.perPage;
//       return this.incomeList.slice(start, end);
//     },
//   }

// }
</script>

<style>

</style>