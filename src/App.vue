<template>
  <div id="app">
    <div class="navigation">
      <ul>
        <li><router-link to="/">Vancouver Blocks</router-link></li>
        <li><router-link to="/hex">Hex things</router-link></li>
        <button class="layer-toggle" @click="toggleTopLayer">Toggle Top Layer</button>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
import store from './store';

export default {
  name: 'App',
  mounted() {
    document.getElementsByClassName('mapboxgl-ctrl-bottom-left')[0].style.left = '460px';
  },
  methods: {
    toggleTopLayer() {
      store.commit('toggleTopLayer');
    }
  }
}
</script>

<style lang="scss" scoped>
#app {

}

.navigation {
  background: #00000099;
  backdrop-filter: saturate(180%) blur(20px);
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100vh;
  width: 460px;
  color: white;
  z-index: 999;

  ul {
    list-style: none;
  }

  a {
    color: white;
    text-decoration: none;
  }
}
</style>