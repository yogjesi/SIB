<template>
  <div>
    <h1>수입 목록</h1>
    <the-income-list></the-income-list>
  </div>
</template>

<script>
import TheIncomeList from '@/components/income/TheIncomeList'
// import {mapState} from 'vuex'

export default {
  name: 'Income',
  components: {
    TheIncomeList,
  }

}
</script>

<style>

</style>