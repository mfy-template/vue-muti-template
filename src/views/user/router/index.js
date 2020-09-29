/*
 * @Descripttion: 
 * @version: 
 * @Author: mafengyan
 * @Date: 2020-09-22 09:27:07
 * @LastEditors: mafengyan
 * @LastEditTime: 2020-09-23 09:25:50
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
    component: () => import(/* webpackChunkName: "user/about" */ '../pages/About.vue')
  }
]

const router = new VueRouter({
  base: '/user/',  
  routes
})

export default router
