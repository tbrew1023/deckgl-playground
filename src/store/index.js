import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topVisible: true,
    navActive: true,
    deckLoaded: false
  },
  mutations: {
    toggleTopLayer(state) {
      console.log('toggling top layer', state.topVisible);
      state.topVisible = !state.topVisible;
    },
    toggleNav(state) {
      console.log('toggling nav', state.navActive);
      state.navActive = !state.navActive;
    },
    deckLoaded(state) {
      state.deckLoaded = true;
    },
    deckNotLoaded(state) {
      state.deckLoaded = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
