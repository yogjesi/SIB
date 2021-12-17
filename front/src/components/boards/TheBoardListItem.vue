<template>
  <tr @click="boardDetail">
    <td>{{boardItem.id}}</td>
    <td>{{boardItem.title}}</td>
    <td>{{boardItem.user.fullname}}</td>
    <td>{{boardItem.created_at}}</td>
    <td>{{hits}}</td>
  </tr>
</template>

<script>
export default {
  name:'TheBoardListItem',
  data: function() {
    return {

    }
  },
  props:{
    boardItem:Object,
  },
  methods:{
    boardDetail: function(){
      this.$router.push({name:"BoardDetail",params:{boardPk:this.boardItem.id}})
    }
  },
}
</script>

<style>

</style>