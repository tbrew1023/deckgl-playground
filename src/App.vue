<template>
  <div id="app">
    <div :class="( navActive() ? 'nav-active' : 'nav-inactive' )" class="navigation">
      <ul>
        <li class="logo-container"><div @click="toggleNav()" class="nav-toggle" :class="( navActive() ? 'nav-btn-active' : 'nav-btn-inactive' )"></div><span class="logo"></span></li>
        <router-link to="/"><li><span>Vancouver Blocks</span></li></router-link>
        <router-link to="/hex"><li><span>Hex things</span></li></router-link>
      </ul>
      <button :class="( topVisible() ? 'active' : 'inactive' )" class="layer-toggle" @click="toggleTopLayer">Toggle Top Layer</button>
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
    toggleNav() {
      store.commit('toggleNav');
      //console.log(store.state.navActive);
    },
    toggleTopLayer() {
      store.commit('toggleTopLayer');
      //console.log(this.topVisible());
    },
    topVisible() {
      return store.state.topVisible;
    },
    navActive() {
      return store.state.navActive;
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Roboto, sans-serif;
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
  display: flex;
  flex-direction: column;
  justify-content: center;

  ul {
    list-style: none;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding: 0px;
    width: 100%;

    li {
      //margin: 24px 0px;
      height: 48px;
      border: none;
      font-weight: bold;
      transition: 200ms;
      user-select: none;
      display: flex;
      align-items: center;
      width: 100%;
      padding: 12px 0px;

      &:hover {
        background:#11111199;
      }

      span {
        margin-left: 36px;
      }
    }
  }

  button {
    margin: 24px;
    height: 48px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    transition: 200ms;
    user-select: none;

    &:hover {
      cursor: pointer;
      transform: scale(0.97);
      //background: #ffffff99;
    }
  }

  .active {
    color: black;
    background: white;
    border: solid white 2px;
  }

  .inactive {
    color: white;
    background: transparent;
    border: solid white 2px;
  }

  a {
    color: white;
    text-decoration: none;
  }
}

.router-link-active {
  background: #21212199;
}

.logo {
  width: 80px;
  height: 32px;
  background-image: url('./assets/gl.svg');
  background-size: 42px;
  background-position: 0px 50%;
  background-repeat: no-repeat;
  margin-left: 24px !important;
}

.nav-active {
  background: red !important; 
}

.nav-inactive {
  background: blue !important;
}

.nav-toggle {
  margin-left: 36px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 24px;
  width: 24px;
  cursor: pointer;
  transition: 200ms;
}

.nav-btn-active {
  background-image: url('./assets/arrow.svg');
  
  &:hover {
    transform: translateX(-6px);
  }
}

.nav-btn-inactive {
  background-image: url('./assets/menu.svg');

  &:hover {
    opacity: 0.8;
  }
}

.logo-container {
  cursor: default;

  &:hover {
    background: transparent !important;
  }
}
</style>