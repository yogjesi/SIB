<template>
 <div>
    <h4>User</h4>
        <div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Select <input type="checkbox" @click="selectAll" v-model="allSelected"></th>
                </tr>
                <tr v-for="user in users"
                    :key="user.id">
                    <td>{{ user.name }}</td>
                    <td><input type="checkbox" v-model="userIds" :value="user.id"></td>
                </tr>
            </table>
        </div>

        <span>Selected Ids: {{ userIds }}</span>
</div>

</template>
<script src="https://cdn.jsdelivr.net/vue/latest/vue.js"></script>
<script>
export default {
    name: 'CheckBox',
    data: function() {
      return {
        users: [ 
            { "id": "1", "name": "Shad Jast", "email": "pfeffer.matt@yahoo.com"}, 
            { "id": "2", "name": "Duane Metz", "email": "mohammad.ferry@yahoo.com"}, 
            { "id": "3", "name": "Myah Kris", "email": "evolkman@hotmail.com"}, 
            { "id": "4", "name": "Dr. Kamron Wunsch", "email": "lenora95@leannon.com"}, 
            { "id": "5", "name": "Brendon Rogahn", "email": "verlie.buckridge@yahoo.com"}
        ],
        selected: [],
        allSelected: false,
        userIds: []
        // userIds: new set()
      }
    },
    methods: {
        selectAll: function() {
          var userIds = this.userIds
            if (!this.allSelected) {
              this.users.forEach(function (user) {
                if (userIds.indexOf(user.id)==-1)
                  userIds.push(user.id)
                // userIds.add(user.id) 
              })
            this.allSelected = true 
            }else {
                this.userIds = []
                // userIds.clear()
              this.allSelected = false
            }

        },
    }
}
</script>

<style>

</style>