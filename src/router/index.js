import Vue from 'vue'
import VueRouter from 'vue-router'
import Vancouver from '../views/Vancouver.vue'
import Hex from '../views/Hex.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Vancouver',
    component: Vancouver
  },
  {
    path: '/bike-parking',
    name: 'Hex',
    component: Hex
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('deckNotLoaded');
  setTimeout(() => {
    next();
  }, 300);
});

export default router
