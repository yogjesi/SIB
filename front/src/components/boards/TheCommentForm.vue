<template>
  <div>
    <h2>댓글</h2>
    <p><textarea id="inputtext"
      class="form-control"
      placeholder="댓글을 입력해주세요"
      rows= 2,
      cols= 30,
      v-model.trim="content"
      @keyup.enter="commentCreate" 
    >
    </textarea>
    <b-button @click="commentCreate">작성</b-button></p>
    <the-comment-list-item v-for="(comment,index) in paginatedData" 
      :key="index"
      :comment-item="comment"
    >
    </the-comment-list-item>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import TheCommentListItem from '@/components/boards/TheCommentListItem.vue'
import {mapState} from 'vuex'
export default {
  name:'TheCommentForm',
  data: function() {
    return {
      content:'',
      perPage: 5,
      currentPage: 1,
      pageNum:0
    }
  },
  methods:{
    commentCreate: function(){
      this.$store.dispatch('commentCreate',[this.$route.params.boardPk,this.content])
      this.content=''
    }
  },
  components:{
    TheCommentListItem
  },
  computed: {
    ...mapState([
      'commentList'
    ]),
    rows() {
      return this.commentList.length
    },
    paginatedData () {
      const start = (this.currentPage-1) * this.perPage,
            end = start + this.perPage;
      return this.commentList.slice(start, end);
    },
  },
}
</script>

<style>

</style>