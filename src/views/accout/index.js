/*
 * @Descripttion: 
 * @version: 
 * @Author: mafengyan
 * @Date: 2020-09-22 09:25:54
 * @LastEditors: mafengyan
 * @LastEditTime: 2020-09-24 13:37:20
 */
 
 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  '@style/wrap.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
