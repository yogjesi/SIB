<template>
  <div id="Book">
    <div style="width:100%; height:600px;">
      <h1>날짜 설정</h1>
      <Calculator />
    </div>
    <div style="background-color:green; width:100%; height:300px;">
      <check-box></check-box>
    </div>
    <div>
      <h1>엑셀다운로드</h1>
      <ExcelDownloadDemo />
    </div>
  </div>
</template>
<script>
// import {mapState} from 'vuex'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import ExcelDownloadDemo from '@/components/books/ExcelDownloadDemo.vue'
import CheckBox from '@/components/books/CheckBox.vue'
import Calculator from "@/components/books/Calculator.vue";

export default {
  name: 'Book',
  components: {
    Calculator,
    CheckBox,
    ExcelDownloadDemo,
  },
}
</script>