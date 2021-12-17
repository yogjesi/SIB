<template>
    <v-card>
      <v-card-title>
      회계장부
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="transactions"
        :search="search"
        class="elevation-1"
      ></v-data-table>
    </v-card>
</template>
<script>
export default {
  name: 'Book',
  data: function() {
      return {
        search: '', 
        headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: '날짜', value: 'day' },
        { text: '분류', value: 'category' },
        { text: '내용', value: 'content' },
        { text: '수입액', value: 'income' },
        { text: '지출액', value: 'outcome' },
        { text: '잔액', value: 'balance' },
        ],
      }
    },
  computed: {
    transactions: function() {
      return this.$store.state.transactions
    }
  },
}
</script>
<style>
</style>