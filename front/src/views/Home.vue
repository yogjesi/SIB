<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row my-4">
        <h2 v-if="currentUser.authority > 1 | currentUser.is_superuser">현재 청년부 총 잔액은<br>
          <span class="display-3">{{lastBalance | Comma}}</span>원 입니다.</h2>
      </div>
    </div>
    <div class="container-fluid">
      <div class="col col-md-10 offset-md-1" style="text-align:center;"><p>{{bibleList}} {{bibleList.contet}}</p></div>
    </div>
    <div class="mt-5">
      <b-button @click="randomBible">다른 말씀</b-button>
    </div>
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
