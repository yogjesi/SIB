<template>
  <div id="Book">
    <calendar></calendar>
    <!-- <Calculator /> -->
    <!-- <check-box></check-box> -->
    <!-- <ExcelDownloadDemo /> -->
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
// import ExcelDownloadDemo from '@/components/books/ExcelDownloadDemo.vue'
// import CheckBox from '@/components/books/CheckBox.vue'
// import Calculator from "@/components/books/Calculator.vue";
import Calendar from '@/components/books/Calendar.vue'


export default {
  name: 'Book',
  components: {
    // Calculator,
    // CheckBox,
    // ExcelDownloadDemo,
    Calendar,
  },
}
</script>
