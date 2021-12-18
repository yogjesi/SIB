import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import connectPlugin from './plugins/connectPlugin'

Vue.use(connectPlugin)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

var vm = new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


window.app = vm;