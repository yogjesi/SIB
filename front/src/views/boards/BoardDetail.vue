<template>
  <div>
    <h2>상세글</h2>
    {{boardDetail}}
    <iframe :src="videoSelect(boardDetail.video)" width="640" height="360" frameborder="0"></iframe>
    <img :src="boardDetail.image" alt="">
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'TheBoardDetail',
  computed:{
    ...mapState([
      'boardDetail'
    ])
  },
  methods:{
    videoSelect: function(source){
      // 기본 유튜브 주소를 접근할 경우, 접근 거부를 당함, 따라서 기본 유튜브 주소일떄는, 접근 가능한 주소로 변경할 필요가 있다.
      if(source.includes("https://www.youtube.com/watch?v=")){
        const index = source.indexOf("=")
        return `https://www.youtube.com/embed/${source.substr(index+1)}`
      }else if (source == ""){
        return null
      }
      else{
        return source
      }
    }
  },
  created: function(){
    this.$store.dispatch('boardDetail',this.$route.params.boardPk)
  }
}
</script>

<style>

</style>