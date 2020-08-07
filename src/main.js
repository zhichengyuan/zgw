// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n/i18n'; // 国际化

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/base.css";
Vue.use(Element)
import Request from '@/api/apis';
Vue.prototype.$request = Request; 
Vue.prototype.$imgpath = Request.imgpath;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  components: { App },
  template: '<App/>'
})
