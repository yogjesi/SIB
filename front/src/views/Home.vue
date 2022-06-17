<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row my-4">
        <h2 id="mainpage" v-if="currentUser.authority > 1 | currentUser.is_superuser">
          현재 청년부 총 잔액은<br>
          <Roller id="roller" class="display-3" :text="lastBalance" :transition="1.5" :isNumberFormat="true"></Roller>원 입니다.</h2>
      </div>
    </div>
    <div class="container-fluid">
      <div id="subtitle" class="col col-md-10 offset-md-1" style="text-align:center;"><p>{{bibleList}} {{bibleList.contet}}</p></div>
    </div>
    <div class="mt-5">
      <b-button id="btntext" @click="randomBible">랜덤 말씀</b-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import _ from 'lodash'
import { mapState } from 'vuex'
import Roller from 'vue-roller'

export default {
  name: 'Home',
  components:{
    Roller,
  },
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

<style>

#roller {
  display: inline;
}

</style>