<template>
  <v-container>
    <div id='map'></div>
  </v-container>
</template>

<script>
import {mapboxgl, setMap} from '../state'

const TEST = [ 5, 52];
const center = TEST;


export default {
  name: 'HelloWorld',
  setup() {
    return {mapboxgl}
  },
  data: () => ({}),
  async mounted() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: 5,
      maxZoom: 20
    });
    setMap(map);

  }

}
</script>

