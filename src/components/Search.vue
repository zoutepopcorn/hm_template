<template>
  <v-container>
    <div id="menu">
      <v-card v-if="expand" class="right" max-width="300">
        <v-card-text>
          <v-btn text fab @click="expand = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-text>
        <v-card-text>

          <v-text-field outlined color="green"></v-text-field>
        </v-card-text>

      </v-card>

      <v-btn v-if="!expand" class="ma-2" color="primary" @click="expand = true" fab>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <br>
    </div>

  </v-container>
</template>

<script>

import {ref} from '@vue/composition-api'

export default {
  setup() {
    const expand = ref(false);
    return {expand}
  }
}
</script>


<style>

.right {
  margin-left: auto;
  margin-right: 0;
}

#menu {
  position: absolute;
  z-index: 99999999;
  text-align: right;
  padding: 4px;
  width: 700px;
  right: 6px;
}
</style>