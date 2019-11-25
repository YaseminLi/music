import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
//eslint-disable-next-line
// import vConsole from "vconsole"

// console.log("vconsole test")
FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  loading: require('common/img/loading.jpeg'),
})

import 'common/stylus/index.styl'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
