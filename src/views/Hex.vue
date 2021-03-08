<template>
  <div class="hex">
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
      :viewState="{latitude: 37.754, longitude: -122.466, zoom: 12.5, maxZoom: 16, pitch: 53, bearing: 10.125}"
      :useDevicePixels="false"
      :width="'100%'"
      :height="'100%'"
      @initialRender="handleDeckLoad()"
    >
        <Mapbox
            class="fill-wrapper"
            accessToken="pk.eyJ1IjoidHJlbnRicmV3IiwiYSI6ImNrbHliamhwNTA3cG8ydm1yZzN3MHI1NTIifQ.rOLxTdO6kJNGlYsQ_2IKaA"
            container="test"
            :center="[-122.466, 37.754]"
            :zoom="12.5"
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
  },
  methods: {
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
        console.log('DECK HAS LOADED! | hex');
        this.hasDeckLoaded = true;
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
        console.log('hovering!', e);
    }
  },
  created() {
    this.data_url = DATA_URL
  },
  mounted() {
      this.$forceUpdate;
      console.log('force updating...');
  }
};
</script>

<style scoped lang="scss">

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