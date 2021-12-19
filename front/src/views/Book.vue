<template>
  <div id="Book">

    <hr>
    <doughnut-chart></doughnut-chart>
    <hr>
    <h1>날짜 설정</h1>
    <Calculator />
    <check-box></check-box>
    <hr>
    <h1>엑셀다운로드</h1>
    <ExcelDownloadDemo />

  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import ExcelDownloadDemo from '@/components/books/ExcelDownloadDemo.vue'
import CheckBox from '@/components/books/CheckBox.vue'
import Calculator from "@/components/books/Calculator.vue";
import DoughnutChart from '@/components/books/DoughnutChart.vue'


export default {
  name: 'Book',
  components: {
    Calculator,
    CheckBox,
    ExcelDownloadDemo,
    DoughnutChart,
  },
}
</script>