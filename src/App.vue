<template>
  <div id="app">
    <div v-if="!deckLoaded" class="loader"></div>
    <div :class="( navActive ? ( deckLoaded ? 'nav-container-active' : 'nav-load' ) : 'nav-container-inactive' )" class="navigation">
      <div class="logo-container"><div @click="toggleNav()" class="nav-toggle" :class="( navActive ? 'nav-btn-active' : 'nav-btn-inactive' )"></div><span class="logo"></span></div>
      <div :class="( navActive ? 'nav-active' : 'nav-inactive' )" class="nav-inner">
        <ul>
          <router-link to="/"><li><span>Vancouver Blocks</span></li></router-link>
          <router-link to="/bike-parking"><li><span>SF Bike Parking</span></li></router-link>
        </ul>
        <button :class="( topVisible ? 'active' : 'inactive' )" class="layer-toggle" @click="toggleTopLayer">Toggle Top Layer</button>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import store from './store';

export default {
  name: 'App',
  computed: {
    topVisible() {
      return store.state.topVisible;
    },
    navActive() {
      return store.state.navActive;
    },
    deckLoaded() {
      return store.state.deckLoaded;
    }
  },
  mounted() {
    setTimeout(() => {
      document.getElementsByClassName('mapboxgl-ctrl-bottom-left')[0].style.left = '460px';
      document.getElementsByClassName('mapboxgl-ctrl-bottom-left')[0].style.transition = '300ms';
    }, 1000);
  },
  methods: {
    toggleNav() {
      store.commit('toggleNav');
      if(store.state.navActive) {
        document.getElementsByClassName('mapboxgl-ctrl-bottom-left')[0].style.left = '460px';
      } else {
        document.getElementsByClassName('mapboxgl-ctrl-bottom-left')[0].style.left = '0px'; 
      }
    },
    toggleTopLayer() {
      store.commit('toggleTopLayer');
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0px;
  padding: 0px;
}

#app {
  font-family: Roboto, sans-serif;
}

.navigation {
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
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: calc(100vh - 170px);
    transition: 200ms;

    a {
      width: 80%;
      padding: 12px 0px;
      border-radius: 0px 60px 60px 0px;
      transition: 200ms;

      &:hover {
        span {
          margin-left: 43px;
        }
      }

      span {
        margin-left: 36px;
        transition: 200ms;
      }
    }

    li {
      height: 48px;
      border: none;
      font-weight: bold;
      transition: 200ms;
      user-select: none;
      display: flex;
      align-items: center;
    }
  }

  button {
    margin: 24px;
    border: none;
    border-radius: 48px;
    font-weight: bold;
    transition: 200ms;
    outline: none;
    padding: 18px 32px;
    font-size: 14px;

    &:hover {
      cursor: pointer;
      transform: scale(0.97);
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

.router-link-exact-active {
  background: #21212199;
  transition: 300ms;
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
  width: 100% !important;
  transition: 300ms;
}

.nav-inactive {
  transform: translateX(-60px);
  opacity: 0;
  transition: 300ms;
  
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
    background: transparent !important;
  }

  span {
    margin-left: 24px;
  }
}

.nav-container-active {
  background: #00000099;
  backdrop-filter: saturate(180%) blur(20px);
  transition: 300ms;
  width: 460px;
}

.nav-container-inactive {
  background: #00000000;
  backdrop-filter: saturate(0%) blur(0px);
  transition: 300ms;
  width: 280px;
}

.nav-load {
  transition: 300ms;
  background: black !important;
  backdrop-filter: saturate(0%) blur(0px);
  width: 100% !important;

  ul {
    opacity: 0 !important;
  }
}

.loader {
  color: #ffffff;
  font-size: 20px;
  margin: auto;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: absolute;
  z-index: 9999;
  transform: scale(0.4) !important;
  text-indent: -9999em;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}

@keyframes enter-load {
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
}
</style>