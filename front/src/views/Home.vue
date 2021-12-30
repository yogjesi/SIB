<template>
  <div class="home">
    <h2 v-if="currentUser.authority > 1 | currentUser.is_superuser">현재 청년부 총 잔액은 <span class="display-3">{{lastBalance}}</span>원 입니다.</h2>
    <b-button @click="randomBible">클릭</b-button>
    <p>{{bibleList}} {{bibleList.contet}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
// import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  methods:{
    randomBible: function(){
      this.$store.dispatch('bibleList')
    }
  },
  computed:{
    ...mapState([
      'bibleList','lastBalance','currentUser'
    ]),
  },
}
</script>
