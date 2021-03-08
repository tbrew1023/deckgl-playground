<template>
  <div id="app">
    <div 
      class="tooltip" 
      v-if="tooltip.active" 
      :style="hoverPosition" 
      :class="( tooltip.expanded ? 'tooltip-container-expand' : 'tooltip-container-collapse' )"
    >
      <span>Value per square mile: <strong>{{tooltip.body.sqm}}</strong></span>
      <div :class="( tooltip.expanded ? 'tooltip-expanded' : 'tooltip-collapsed' )">
        <span>Growth: <strong>{{tooltip.body.growth}}</strong></span>
      </div>
    </div>
    <DeckGL 
      ref="deck"
      class="fill-wrapper"
      :controlMap="true"
      :controller="true"
      :viewState="{latitude: 49.254, longitude: -123.13, zoom: 11, maxZoom: 16, pitch: 45, bearing: 0}"
      :useDevicePixels="false"
      :width="'100%'"
      :height="'100%'"
      @initialRender="handleDeckLoad()"
    >
      <Mapbox
        class="fill-wrapper"
        accessToken="pk.eyJ1IjoidHJlbnRicmV3IiwiYSI6ImNrbHliamhwNTA3cG8ydm1yZzN3MHI1NTIifQ.rOLxTdO6kJNGlYsQ_2IKaA"
        container="test"
        :center="[-123.13, 49.254]"
        :zoom="11"
        :bearing="0"
        :pitch="45"
      />
      <GeoJsonLayer
        :data="data_url"
        :id="'my-layer'"
        :opacity="0.8"
        :visible="topVisible"
        :stroke="false"
        :filled="true"
        :extruded="true"
        :wireframe="true"
        :fp64="true"
        :getElevation="(f) => Math.sqrt(f.properties.valuePerSqm) * 10"
        :getFillColor="(f) => colorScale(f.properties.growth)"
        :getLineColor="[255, 255, 255]"
        :pickable="true"
        :onHover="deckTooltipCallback"
        :onClick="handleTooltipClick"
      />
    </DeckGL>
  </div>
</template>

<script>
import {DeckGL, Mapbox, GeoJsonLayer} from '@hirelofty/vue_deckgl'
import store from '../store';

export default {
  name: 'Home',
  data() {
    return {
      tooltip: {
        x: 0,
        y: 0,
        body: {
          sqm: 0,
          growth: 0
        },
        active: false,
        expanded: false
      },
      hasDeckLoaded: false,
      data_url: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json'
    }
  },
  components: {
    DeckGL,
    Mapbox,
    GeoJsonLayer
  },
  mounted() {
    console.log('app mounted');
    setTimeout(() => {
      document.getElementsByClassName('mapboxgl-ctrl-bottom-left')[0].style.left = '460px';
      document.getElementsByClassName('mapboxgl-ctrl-bottom-left')[0].style.transition = '300ms';
    }, 1000);
  },
  computed: {
    hoverPosition() {
      return {
        'position': 'absolute',
        'left': (this.tooltip.x + 12) + 'px',
        'top': (this.tooltip.y + 12) + 'px'
      }
    },
    topVisible() {
      return store.state.topVisible;
    },
    deckLoaded() {
      return store.state.deckLoaded;
    }
  },
  methods: {
    handleTooltipClick(e) {
      console.log(e);
      this.tooltip.expanded = true;
    },
    deckTooltipCallback(e) {
      //console.log('hovering the thing', (e.object ? e : e ));
      this.tooltip.x = e.x;
      this.tooltip.y = e.y;
      this.tooltip.body.sqm = (e.object ? e.object.properties.valuePerSqm : 0 );
      this.tooltip.body.growth = (e.object ? e.object.properties.growth : 0 );
      this.tooltip.expanded = false;
      if(e.picked) {
        this.tooltip.active = true;
      } else {
        this.tooltip.active = false;
      }
    },
    toggleTopLayer() {
      this.topVisible = !this.topVisible;
    },
    colorScale(scale) {
      return scale;
    },
    handleDeckLoad() {
      this.hasDeckLoaded = true;
      setTimeout(() => {
        store.commit('deckLoaded');
      }, 2000);
    }
  }
}
</script>

<style scoped lang="scss">
.fill-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
}

.tooltip {
  background: #00000099;
  backdrop-filter: saturate(180%) blur(20px);
  width: 300px;
  height: 1.8%;
  top: 0px;
  right: 0px;
  color: white;
  border-radius: 12px;
  padding: 12px 0px;
  position: absolute;
  z-index: 999;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.layer-toggle {
  position: absolute;
  top: 150px;
  right: 0px;
  z-index: 999;
}

.tooltip-expanded {
  height: 100px;
  opacity: 1;
  background: black;
  transition: height 300ms;
  width: 300px;
  margin-top: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 0px 0px 12px 12px;
  text-align: center;
}

.tooltip-collapsed {
  background: black;
  height: 0px;
  opacity: 0;
  transition: height 300ms;
  width: 300px;
  margin-top: 12px;
}

.tooltip-container-expand {
  border-radius: 12px 12px 0px 0px;

  span {
    margin-left: 12px;
  }
}

.tooltip-container-collapse {
  border-radius: 12px;

  span {
    margin-left: 12px;
  }
}
</style>