<template>
  <v-container>
    <div id='map'></div>
  </v-container>
</template>

<script>
import {mapboxgl} from '../state'

const TEST = [ -122.431297, 37.773972];
const center = TEST;


export default {
  name: 'HelloWorld',
  setup() {
    return {mapboxgl}
  },
  data: () => ({}),
  mounted() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: 5,
      maxZoom: 20
    });

  }

}
</script>

