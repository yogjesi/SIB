<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table
      id="my-table"
      :items="boardList"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
    <tr v-for="p in paginatedData" :key="p.no">
      <td>{{ p.title }}</td>
      <td>{{ p.content }}</td>
    </tr>
  </div>
</template>

<script>
export default {
  name:'TheBoardList',
  data: function() {
    return {
      perPage: 1,
      currentPage: 1,
    }
  },
  props:{
    boardList:Array
  },
  computed: {
    rows() {
      return this.boardList.length
    }
  },
  paginatedData () {
    const start = this.data.currentPage * this.data.perPage,
          end = start + this.perPage;
    return this.listArray.slice(start, end);
  }

}
</script>

<style>

</style>