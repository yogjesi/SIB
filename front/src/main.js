import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
import vueMoment from 'vue-moment' 

Vue.use(vueMoment)


Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.filter("Comma", val =>{
  if (val){
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
})

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
