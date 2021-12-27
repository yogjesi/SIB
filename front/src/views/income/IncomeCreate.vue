<template>
  <div>
    <h1>수입 작성 양식</h1>
    <br>
    <h2>수입 내역</h2>
    <input type="text" placeholder="돈 들어온 곳">
    <h2>금액</h2>
    <input type="text" placeholder="금액">
    <h2>수입 일시</h2>
    <input type="date" pattern="\d{4}-\d{2}-\d{2}">
    <h2>수입 상세 내역</h2>
    <input type="text" placeholder="수입에 관한 상세 내역을 입력해주세요.">
  </div>
</template>

<script>

export default {
  name: 'IncomeCreate',
  

}
</script>

<style>

</style>