<template>
  <div id="app">
    <div 
      class="toolip" 
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
      :viewState="{latitude: 49.254, longitude: -123.13, zoom: 11, maxZoom: 16, pitch: 45, bearing: 0}"
      :useDevicePixels="false"
      :width="'100%'"
      :height="'100%'"
    >
      <Mapbox
        class="fill-wrapper"
        accessToken="pk.eyJ1IjoidHJlbnRicmV3IiwiYSI6ImNrbHliamhwNTA3cG8ydm1yZzN3MHI1NTIifQ.rOLxTdO6kJNGlYsQ_2IKaA"
        container="test"
        :zoom="2"
        :bearing="0"
        :center="[-123.13, 49.254]"
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
        body: 0,
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
    }
  },
  methods: {
    handleTooltipClick(e) {
      console.log(e);
      this.tooltip.expanded = true;
      console.log(this.tooltip.expanded);
    },
    deckTooltipCallback(e) {
      //console.log('hovering the thing', (e.object ? e : e ));
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
    toggleTopLayer() {
      this.topVisible = !this.topVisible;
    },
    colorScale(scale) {
      return scale;
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

.toolip {
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

.layer-toggle {
  position: absolute;
  top: 150px;
  right: 0px;
  z-index: 999;
}

.tooltip-expanded {
  //background: red !important;
  height: 200px;
  transition: height 300ms;
}

.tooltip-collapsed {
  //background: blue !important;
  transition: height 300ms;
}
</style>