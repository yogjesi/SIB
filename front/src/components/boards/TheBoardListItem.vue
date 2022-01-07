<template>
  <tr @click="boardDetail">
    <td style="text-align:start;">{{boardItem.title}}</td>
    <td style="text-align:start;">{{boardItem.user.fullname}}</td>
    <td style="text-align:start;">{{boardItem.created_at|moment(`YYYY년 MM월DD일 HH시mm분`)}}</td>
    <td style="text-align:end;">{{boardItem.hits}}</td>
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