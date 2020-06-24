import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

// vue-router
import router from './router';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
