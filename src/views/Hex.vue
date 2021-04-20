<template>
  <div class="hex">
    <div class="topbar">
      <div class="search-wrapper"><input type="text" placeholder="Search" v-model="query"/><span @click="search"></span></div>
      <button class="zoom-out" @click="goToNYC()">got to nyc</button>
    </div>
    <div 
      class="tooltip" 
      v-if="tooltip.active" 
      :style="hoverPosition" 
      :class="( tooltip.expanded ? 'tooltip-expanded' : 'tooltip-collapsed' )"
    >
      Value per square mile: {{tooltip.body}}
    </div>
    <DeckGL 
      ref="deck"
      class="fill-wrapper"
      :controlMap="true"
      :controller="true"
      :viewState="{longitude: newCenter[0], latitude: newCenter[1], zoom: 12, maxZoom: 16, pitch: 53, bearing: 10.125}"
      :useDevicePixels="false"
      :width="'100%'"
      :height="'100%'"
      @initialRender="handleDeckLoad()"
    >
        <Mapbox
          class="fill-wrapper"
          :accessToken="mapboxToken"
          container="test"
          :center="newCenter"
          :zoom="12"
          :bearing="10.125"
          :pitch="53"
        />
        <HexagonLayer
          :id="'heatmap'"
          :visible="topVisible"
          :extruded="true"
          :getPosition="d => d.COORDINATES"
          :upperPercentile="120"
          :radius="60"
          :data="data_url"
          :onHover="deckTooltipCallback"
          :onClick="handleTooltipClick"
        />
    </DeckGL>
  </div>
</template>

<script>
import {DeckGL, Mapbox, HexagonLayer } from "@hirelofty/vue_deckgl";

import { MAPBOX_SETTINGS, DECKGL_SETTINGS } from "../settings";
import { colorScale } from "../utils";
import { DATA_URL } from '../settings';
import store from '../store';
import axios from 'axios';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidHJlbnRicmV3IiwiYSI6ImNrbHliamhwNTA3cG8ydm1yZzN3MHI1NTIifQ.rOLxTdO6kJNGlYsQ_2IKaA';

export default {
  components: { 
    DeckGL, 
    Mapbox, 
    HexagonLayer 
  },
  name: "Hex",
  data() {
    return {
      zoom: 12,
      newCenter: [-122.466, 37.754], 
      query: '',
      mapbox_api: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
      tooltip: {
        x: 0,
        y: 0,
        body: 0,
        active: false,
        expanded: false
      },
      mapboxToken: MAPBOX_TOKEN,
      mapboxSettings: MAPBOX_SETTINGS,
      deckglSettings: DECKGL_SETTINGS,
      data_url: '',
      layers: [],
      effects: [],
      hasDeckLoaded: false,
      colorScale: colorScale,
      deckTooltipHovered: false,
      colorRange: [
        [1, 152, 189],
        [73, 227, 206],
        [216, 254, 181],
        [254, 237, 177],
        [254, 173, 84],
        [209, 55, 78]
      ]
    };
  },
  computed: {
      topVisible() {
        return store.state.topVisible;
      },
      hoverPosition() {
        return {
          'position': 'absolute',
          'left': (this.tooltip.x + 12) + 'px',
          'top': (this.tooltip.y + 12) + 'px'
        }
      },
      deckLoaded() {
        return store.state.deckLoaded;
      }
  },
  created() {
    this.data_url = DATA_URL
  },
  mounted() {
    setTimeout(() => {
      document.getElementsByClassName('mapboxgl-ctrl-bottom-left')[0].style.left = '460px';
      document.getElementsByClassName('mapboxgl-ctrl-bottom-left')[0].style.transition = '300ms';
    }, 1000);
  },
  methods: {
    goToNYC() {
      this.$refs.deck.moveMap({
        viewState: {
          longitude: -70.4,
          latitude: 40.7,
          zoom: 12,
          bearing: 10.125,
          pitch: 0
        }
      });
      console.log('moving map');
    },
    search() {
      console.log('searching for: ', this.query);
      axios.get(`${this.mapbox_api}/${this.query}.json?access_token=${this.mapboxToken}`).then((result) => {
        this.newCenter = result.data.features[0].center;
        console.log(this.newCenter);
        this.$refs.deck.moveMap({
          viewState: {
            longitude: this.newCenter[0],
            latitude: this.newCenter[1],
            zoom: 12,
            bearing: 10.125,
            pitch: 0
          }
        });
      })
    },
    testSinglePick() {
      console.log(this.$refs.deck.pickObject(100, 100, 0, null, false));
    },
    testMultiPick() {
      console.log(
        this.$refs.deck.pickMultipleObjects(100, 100, 0, null, 10, false)
      );
    },
    testObjectsPick() {
      console.log(this.$refs.deck.pickObjects(100, 100, 1, 1, null));
    },
    toggleTopLayer() {
      this.topVisible = !this.topVisible;
    },
    handleDeckLoad() {
      console.log('Deck loaded!');
      this.hasDeckLoaded = true;
      setTimeout(() => {
          store.commit('deckLoaded');
      }, 2000);
    },
    handleTooltipClick(e) {
      console.log(e);
      this.tooltip.expanded = true;
      console.log(this.tooltip.expanded);
    },
    deckTooltipCallback(e) {
      console.log('hovering the thing', (e.object ? e : e ));
      this.tooltip.x = e.x;
      this.tooltip.y = e.y;
      this.tooltip.body = (e.object ? e.object.properties.valuePerSqm : 0 );
      this.tooltip.expanded = false;
      if(e.picked) {
        this.tooltip.active = true;
      } else {
        this.tooltip.active = false;
      }
    },
    handleHover(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped lang="scss">

.zoom-out {
  position: absolute;
  right: 24px;
  top: 80px;
  z-index: 999;
}

.fill-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
#example-deck-tooltip {
  position: absolute;
  background-color: purple;
  width: 10%;
  height: 10%;
}

.tooltip {
  background: #00000099;
  backdrop-filter: saturate(180%) blur(20px);
  width: 12%;
  height: 2%;
  top: 0px;
  right: 0px;
  color: white;
  border-radius: 12px;
  padding: 12px 24px;
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tooltip-expanded {
  height: 200px;
  transition: height 300ms;
}

.tooltip-collapsed {
  transition: height 300ms;
}
.search-wrapper {
  display: flex;
  align-items: center;
  position: absolute;
  background: white;
  //backdrop-filter: blur(24px);
  right: 24px;
  top: 24px;
  width: 300px;
  height: 40px;
  border-radius: 36px;
  z-index: 1;

  span {
    margin-right: 18px;
    height: 24px;
    width: 24px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../assets/search.svg');
    cursor: pointer;
    transition: 200ms;

    &:hover {
      opacity: 0.6;
      transform: scale(0.9);
    }
  }

  input {
    background: transparent;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    border: none;
    padding-left: 18px;
    box-sizing: border-box;
    outline: none;
  }
}
</style>