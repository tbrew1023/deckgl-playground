import Vue from 'vue'
import VueRouter from 'vue-router'
import Vancouver from '../views/Vancouver.vue'
import Hex from '../views/Hex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Vancouver',
    component: Vancouver
  },
  {
    path: '/hex',
    name: 'Hex',
    component: Hex
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
