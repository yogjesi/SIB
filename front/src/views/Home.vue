<template>
  <div class="home">
    <h2 v-if="currentUser.authority > 1 | currentUser.is_superuser">현재 청년부 총 잔액은 <span class="display-3">{{lastBalance}}</span>원 입니다.</h2>
    <p>{{bibleList.index}} {{bibleList.content}}</p>
    
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed:{
    ...mapState([
      'bibleList','lastBalance','currentUser'
    ])
  },
  created:function(){

  },
}
</script>
