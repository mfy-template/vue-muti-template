/*
 * @Descripttion: 
 * @version: 
 * @Author: mafengyan
 * @Date: 2020-09-22 09:26:37
 * @LastEditors: mafengyan
 * @LastEditTime: 2020-09-23 09:25:59
 */
 
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "accout/about" */ '../pages/About.vue')
  }
]

const router = new VueRouter({
  base: '/accout/',  
  routes
})

export default router
