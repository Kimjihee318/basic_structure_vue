import Vue from 'vue'
import App from './App.vue'
import '@/assets/style/index.scss'

// * plugins
import store from '@/store'
import router from '@/routes'
import '@/plugins'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

sync(store, router)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
