import Vue from 'vue'
import store from './store'
import App from './components/App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  vuetify,
  store,
  render: h => h(App)
})
