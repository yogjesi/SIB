<template>
    <div class="result-table">
      <b-table striped hover bordered :items="transactions"></b-table>
      <button type="button" class="download-btn" v-on:click="download">Download</button>
    </div>
</template>

<style scoped>
.result-table {
  width: 50%;
  text-align: center;
}
.download-btn {
  background-color: DodgerBlue;
  border: none;
  color: white;
  padding: 12px 30px;
  margin: 12px 0;
  cursor: pointer;
  font-size: 20px;  
}
/* Darker background on mouse-over */
.download-btn:hover {
  background-color: RoyalBlue;
}
</style>

<script>
import { BTable } from 'bootstrap-vue';
import XLSX from 'xlsx';
export default {
    name: 'ExcelDownloadDemo',
    components: {
      BTable
    },
    methods: {
      download : function() {
        const data = XLSX.utils.json_to_sheet(this.transactions)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, data, 'data')
        XLSX.writeFile(wb,'demo.xlsx')
      }
    },
  computed: {
    transactions: function() {
      return this.$store.state.transactions
    }
  },
}
</script>