<template>
  <div class="home">
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
      'bibleList',
    ])
  },
  created: function(){
    this.$store.dispatch('bibleList')
  },
}
</script>
