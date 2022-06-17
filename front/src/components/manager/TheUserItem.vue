<template>
  <tr>
    <td style="text-align:start;">{{userItem.username}}</td>
    <td style="text-align:start;">{{userItem.fullname}}</td>
    <td style="text-align:start;">{{userItem.email}}</td>
    <td style="text-align:start;">{{authority}}</td>
    <td>
      <b-button id="btntext" class="btn-sm btn-outline-danger" variant="none" v-if="userItem.authority==1" @click="$bvModal.show(`modal-delete-${userItem.id}`)">회원 강퇴</b-button>
        <b-modal :id="'modal-delete-'+userItem.id" class="subtitle">
          <template #modal-header>
            <h5>회원 강퇴하기</h5>
          </template>
          <template #default>
            <p>현재 지정한 회원은 {{userItem.fullname}}({{userItem.username}})을 강퇴하시겠습니까?. </p>
            <p>진행하시려면 현재 회장의 아이디 및 비밀번호를 입력해주세요.</p>
            <form action="#">
              <div>
                <label for="username">아이디: </label>
                <input 
                class="form-control"
                type="text"
                id="username"
                v-model="managerInfo.username"
                >
              </div>
              <div>
                <label for="password">비밀번호: </label>
                <input 
                class="form-control"
                type="password"
                id="password"
                autoComplete="on"
                v-model="managerInfo.password"
                >
              </div>
            </form>
          </template>

          <template #modal-footer="{ ok, cancel }">
            <b-button id="btntext" size="sm" variant="danger" @click="[ok(),deleteUser([managerInfo,userItem.id])]">
              예
            </b-button>
            <b-button id="btntext" size="sm" variant="secondary" @click="cancel()">
              아니요
            </b-button>
          </template>
        </b-modal>     
    </td>
    <td>
      <b-button id="btntext" class="btn-sm btn-outline-success" variant="none" v-if="!tmpAccountant & userItem.authority==1" @click="$bvModal.show(`modal-${userItem.id}`)">회계 지정</b-button>
      <b-modal :id="'modal-'+userItem.id" class="subtitle">
        <template #modal-header>
          <h5>회계 지정 하기</h5>
        </template>
        <template #default>
          <p>현재 회계는 {{accountant.fullname}}({{accountant.username}}) 입니다. </p>
          <p>{{userItem.fullname}}({{userItem.username}})으로 바꾸시겠습니까?</p>
          <p>바꾸시려면 현재 회장의 아이디 및 비밀번호를 입력해주세요.</p>
          <form action="#">
            <div>
              <label for="username">아이디: </label>
              <input 
              class="form-control"
              type="text"
              id="username"
              v-model="managerInfo.username"
              >
            </div>
            <div>
              <label for="password">비밀번호: </label>
              <input 
              class="form-control"
              type="password"
              id="password"
              autoComplete="on"
              v-model="managerInfo.password"
              >
            </div>
          </form>
        </template>

        <template #modal-footer="{ ok, cancel }">
          <b-button id="btntext" size="sm" variant="danger" @click="[ok(),changeAccountant([managerInfo,userItem,accountant])]">
            예
          </b-button>
          <b-button id="btntext" size="sm" variant="secondary" @click="cancel()">
            아니요
          </b-button>
        </template>
      </b-modal>
      <!-- 회계 취소 -->
      <b-button id="btntext" class="btn-sm btn-outline-danger" variant="none" v-if="tmpAccountant & userItem.authority==4" @click="$bvModal.show(`modal-cancel-${userItem.id}`)">회계 권환 회수</b-button>
      <b-modal :id="'modal-cancel-'+userItem.id" class="subtitle">
        <template #modal-header>
          <h5>회계 권한 회수 하기</h5>
        </template>
        <template #default>
          <p>임시 회계 권한을 회수하시겠습니까?</p>
          <p>현재 회장의 아이디 및 비밀번호를 입력해주세요.</p>
          <form action="#">
            <div>
              <label for="username">아이디: </label>
              <input 
              class="form-control"
              type="text"
              id="username"
              v-model="managerInfo.username"
              >
            </div>
            <div>
              <label for="password">비밀번호: </label>
              <input 
              class="form-control"
              type="password"
              id="password"
              autoComplete="on"
              v-model="managerInfo.password"
              >
            </div>
          </form>
        </template>

        <template #modal-footer="{ ok, cancel }">
          <b-button id="btntext" size="sm" variant="danger" @click="[ok(),cancelAccountant([managerInfo,userItem])]">
            예
          </b-button>
          <b-button id="btntext" size="sm" variant="secondary" @click="cancel()">
            아니요
          </b-button>
        </template>
      </b-modal>
    </td>
    <td>
      <b-button id="btntext" class="btn-sm btn-outline-primary" variant="none" v-if="!tmpManager & userItem.authority==1" @click="$bvModal.show(`modal-m-${userItem.id}`)">회장 지정</b-button>
      <b-modal :id="'modal-m-'+userItem.id" class="subtitle">
        <template #modal-header>
          <h5>회장 지정 하기</h5>
        </template>
        <template #default>
          <p>현재 회장는 {{manager.fullname}}({{manager.username}}) 입니다. </p>
          <p>{{userItem.fullname}}({{userItem.username}})으로 바꾸시겠습니까?</p>
          <p>바꾸시려면 현재 회장의 아이디 및 비밀번호를 입력해주세요.</p>
          <form action="#">
            <div>
              <label for="username">아이디: </label>
              <input 
              class="form-control"
              type="text"
              id="username"
              v-model="managerInfo.username"
              >
            </div>
            <div>
              <label for="password">비밀번호: </label>
              <input 
              class="form-control"
              type="password"
              id="password"
              autoComplete="on"
              v-model="managerInfo.password"
              >
            </div>
          </form>
        </template>

        <template #modal-footer="{ ok, cancel }">
          <b-button id="btntext" size="sm" variant="danger" @click="[ok(),changeManager([managerInfo,userItem,manager])]">
            예
          </b-button>
          <b-button id="btntext" size="sm" variant="secondary" @click="cancel()">
            아니요
          </b-button>
        </template>
      </b-modal>
      <!-- 회장 취소 -->
      <b-button id="btntext" class="btn-sm btn-outline-danger" variant="none" v-if="tmpManager & userItem.authority==5 & manager.id==currentUser.id" @click="$bvModal.show(`modal-m-cancel-${userItem.id}`)">회장 권환 회수</b-button>
      <b-modal :id="'modal-m-cancel-'+userItem.id" class="subtitle">
        <template #modal-header>
          <h5>회장 권한 회수</h5>
        </template>
        <template #default>
          <p>임시 회장 권한을 회수하시겠습니까?</p>
          <p>현재 회장의 아이디 및 비밀번호를 입력해주세요.</p>
          <form action="#">
            <div>
              <label for="username">아이디: </label>
              <input 
              class="form-control"
              type="text"
              id="username"
              v-model="managerInfo.username"
              >
            </div>
            <div>
              <label for="password">비밀번호: </label>
              <input 
              class="form-control"
              type="password"
              id="password"
              autoComplete="on"
              v-model="managerInfo.password"
              >
            </div>
          </form>
        </template>
        <template #modal-footer="{ ok, cancel }">
          <b-button id="btntext" size="sm" variant="danger" @click="[ok(),cancelManager([managerInfo,userItem])]">
            예
          </b-button>
          <b-button id="btntext" size="sm" variant="secondary" @click="cancel()">
            아니요
          </b-button>
        </template>
      </b-modal>
    </td>
  </tr>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'TheUserItem',
  data:function(){
    return {
      authority:'',
      managerInfo:{
        username:'',
        password:'',
      }
    }
  },
  props:{
    userItem:Object,
  },
  methods:{
    updateAuthority: function(){
      if(this.userItem.authority==3){
        this.authority='회장'
      }else if (this.userItem.authority==2){
        this.authority='회계'
      }else if (this.userItem.authority==4){
        this.authority='회계 인수인계'
      }else if (this.userItem.authority==5){
        this.authority='회장 인수인계'
      }else{
        this.authority='회원'
      }
    },
    deleteUser:function(data){
      this.$store.dispatch('deleteUser',data)
    },
    changeAccountant:function(data){
      this.$store.dispatch('changeAccountant',data)
      this.managerInfo.username=''
      this.managerInfo.password=''
    },
    cancelAccountant:function(data){
      this.$store.dispatch('cancelAccountant',data)
      this.managerInfo.username=''
      this.managerInfo.password=''
    },
    changeManager:function(data){
      this.$store.dispatch('changeManager',data)
      this.managerInfo.username=''
      this.managerInfo.password=''

    },
    cancelManager:function(data){
      this.$store.dispatch('cancelManager',data)
      this.managerInfo.username=''
      this.managerInfo.password=''
    }
  },
  watch: {
    userItem: function () {
      this.updateAuthority()
    }
  },
  computed:{
    ...mapState([
      'currentUser','manager','accountant','tmpAccountant','tmpManager'
    ])
  },
  created:function(){
    this.updateAuthority()
  }
}
</script>

<style scoped>

h5 {
  font-family: 'NanumSquareRound';
}

p {
  font-family: 'NanumSquareRound';
}

</style>