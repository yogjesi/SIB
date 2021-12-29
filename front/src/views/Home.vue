<template>
  <div class="home">
    <h2 v-if="currentUser.authority > 1 | currentUser.is_superuser">현재 청년부 총 잔액은 <span class="display-3">{{lastBalance}}</span>원 입니다.</h2>
    <b-button @click="randomBible">클릭</b-button>
    <p>{{bible.index}} {{bible.content}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data:function(){
    return{
      bible:[],
    }
  },
  methods:{
    randomBible: function(){
      this.bible = _.sampleSize(this.bibleList,1)[0]
    }
  },
  computed:{
    ...mapState([
      'bibleList','lastBalance','currentUser'
    ])
  },
  created:function(){
    this.bible = _.sampleSize(this.bibleList,1)[0]
  },
}
</script>
