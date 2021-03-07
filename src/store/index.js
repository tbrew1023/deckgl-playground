import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topVisible: true
  },
  mutations: {
    toggleTopLayer(state) {
      console.log('toggling top layer', state.topVisible);
      state.topVisible = !state.topVisible;
    }
  },
  actions: {
  },
  modules: {
  }
})
