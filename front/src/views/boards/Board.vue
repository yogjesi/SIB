<template>
  <div>
    <h2>자유게시판</h2>
    <the-board-list :board-list="boardList"></the-board-list>
  </div>
</template>

<script>
import TheBoardList from '@/components/boards/TheBoardList'
import {mapState} from 'vuex'
export default {
  name: 'Boards',
  data: function() {
    return {
    }
  },
  computed:{
    ...mapState([
      'boardList'
    ])
  },
  created: function() {
    this.$store.dispatch('boardList')
  },
  components:{
    TheBoardList,
  }
}
</script>

<style>

</style>
