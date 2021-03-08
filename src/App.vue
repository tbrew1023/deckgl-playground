<template>
  <div id="app">
    <div class="loader-container">
      <div class="loader loader--style8" title="7">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
          <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    </div>
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
    document.getElementsByClassName('mapboxgl-ctrl-bottom-left')[0].style.left = '460px';
    document.getElementsByClassName('mapboxgl-ctrl-bottom-left')[0].style.transition = '300ms';
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
  width: 100% !important;

  ul {
    opacity: 0 !important;
  }
}

.loader{
  margin: 0 0 2em;
  height: 100px;
  width: 20%;
  text-align: center;
  padding: 1em;
  margin: 0 auto 1em;
  display: inline-block;
  vertical-align: top;
}

/*
  Set the color of the icon
*/
svg path,
svg rect{
  fill: #FF6700;
}
</style>