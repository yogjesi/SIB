<template>
  <tr>
    <td>{{userWait.username}}</td>
    <td>{{userWait.fullname}}</td>
    <td>{{userWait.email}}</td>
    <td>
      <b-button @click="$bvModal.show(`modal-approve-${userWait.id}`)">가입 승인</b-button>
      <b-modal :id="'modal-approve-'+userWait.id">
        <template #modal-header>
          <h5>가입 승인</h5>
        </template>
        <template #default>
          <p>{{userWait.fullname}}({{userWait.username}})의 가입을 승인하시겠습니까?</p>
        </template>

        <template #modal-footer="{ ok, cancel }">
          <b-button size="sm" variant="danger" @click="[ok(),approveUser(userWait.id)]">
            예
          </b-button>
          <b-button size="sm" variant="secondary" @click="cancel()">
            아니요
          </b-button>
        </template>
      </b-modal>
      <b-button @click="$bvModal.show(`modal-refuse-${userWait.id}`)">가입 거부</b-button>
      <b-modal :id="'modal-refuse-'+userWait.id">
        <template #modal-header>
          <h5>가입 거부</h5>
        </template>
        <template #default>
          <p>{{userWait.fullname}}({{userWait.username}})의 가입을 거부하시겠습니까?</p>
        </template>

        <template #modal-footer="{ ok, cancel }">
          <b-button size="sm" variant="danger" @click="[ok(),refuseUser(userWait.id)]">
            예
          </b-button>
          <b-button size="sm" variant="secondary" @click="cancel()">
            아니요
          </b-button>
        </template>
      </b-modal>
    </td>
  </tr>
</template>

<script>
export default {
  name:'TheUserWaitItem',
  props:{
    userWait:Object,
  },
  methods:{
    approveUser: function(pk){
      this.$store.dispatch('userApprove',pk)
    },
    refuseUser: function(pk){
      this.$store.dispatch('userRefuse',pk)
    }
  }
}
</script>

<style>

</style>