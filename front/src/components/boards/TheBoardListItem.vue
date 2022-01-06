<template>
  <tr @click="boardDetail">
    <td>{{boardItem.title}}</td>
    <td>{{boardItem.user.fullname}}</td>
    <td>{{boardItem.created_at|moment(`YYYY년 MM월DD일 HH시mm분`)}}</td>
    <td>{{boardItem.hits}}</td>
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