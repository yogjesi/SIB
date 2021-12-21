<template>
 <div>
    <h4>카테고리</h4>
        전체 <input type="checkbox" @click="selectAll" v-model="allSelected">
        <br>
        <div style="background-color: red; float:left;">
          <h4>수입</h4>
          <div v-for="user in users"
              :key="user.id">
              {{ user.name }}
              <input type="checkbox" v-model="userIds" :value="user.name">
          </div>
        </div>
        <div style="background-color: blue; float:left;">
          <h4>지출</h4>
          <div v-for="outcome in outcomes"
              :key="outcome.id">
              <td>{{ outcome.name }}</td>
              <td><input type="checkbox" v-model="userIds" :value="outcome.name"></td>
         </div>
        </div>
        <div>Selected Ids: {{ userIds }}</div>
</div>

</template>
<script src="https://cdn.jsdelivr.net/vue/latest/vue.js"></script>
<script>
export default {
    name: 'CheckBox',
    data: function() {
      return {
        users: [ 
            { "id": "1", "name": "재정부"},
            { "id": "2", "name": "헌금"},
            { "id": "3", "name": "찬조금"},
            { "id": "4", "name": "기타수입"},
        ],
        outcomes: [ 
            { "id": "5", "name": "사업행사비"},
            { "id": "6", "name": "활동비"}, 
            { "id": "7", "name": "경조비"}, 
            { "id": "8", "name": "소모품비"}, 
            { "id": "9", "name": "기타지출"}, 

        ],
        selected: [],
        allSelected: false,
        userIds: []
      }
    },
    methods: {
        selectAll: function() {
          var userIds = this.userIds
            if (!this.allSelected) {
              this.users.forEach(function (user) {
                if (userIds.indexOf(user.name)==-1)
                  userIds.push(user.name)
              })
              this.outcomes.forEach(function (outcome) {
                if (userIds.indexOf(outcome.name)==-1)
                  userIds.push(outcome.name)
              })
            this.allSelected = true 
            }
            else {
                this.userIds = []
              this.allSelected = false
            }

        },
    }
}
</script>

<style>

</style>