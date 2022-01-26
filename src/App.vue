<template>
  <v-app>
    <v-content>
      <Search></Search>
      <Map/>
    </v-content>
  </v-app>
</template>

<script>
import Map from './components/Map';
import Search from './components/Search';

export default {
  name: 'App',

  components: {
    Map,
    Search
  },

  data: () => ({
    //
  }),
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#map {
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0;
  border: 0px;
  width: 100%;
}
</style>
