<template>
  <v-container>
    <div id="menu">
      <v-card v-if="expand" class="right" max-width="300">
        <v-card-actions>
          <v-chip v-if="wegInput" class="ma-2" :color="isAWeg() ? 'red' : 'yellow'" dark label :text-color="isAWeg() ? 'white': 'black'">{{ wegInput.toUpperCase() }}</v-chip>
          <v-chip v-if="hm && hm.text" class="ma-2" color="primary" label text-color="white">{{ hm.text }}</v-chip>

          <v-spacer></v-spacer>
          <v-btn text fab @click="expand = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <!--          <v-text-field v-model="weg" @blur="handleBlur" label="weg" class="mr-3" outlined color="green"></v-text-field>-->
          <v-autocomplete v-model="weg" :items="wegen" :search-input.sync="wegInput"  @blur="handleBlur" label="weg" class="mr-3" outlined
                          color="primary" no-data-text="Geen weg gevonden"></v-autocomplete>

          <v-autocomplete v-model="hm" @change="selectHm" :search-input.sync="hmInput" :items="hms" item-text="text" label="hm paal"
                          no-data-text="Toets een geldig hm paaltje in" color="green" return-object
                          outlined></v-autocomplete>
        </v-card-actions>
      </v-card>

      <v-btn v-if="!expand" class="ma-2" color="primary" @click="expand = true" dark fab>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <!--      {{ hm }}-->
      <br>
    </div>

  </v-container>
</template>

<script>
import {ref, watch} from '@vue/composition-api'
import {fly} from "../state";

export default {
  setup() {
    const expand = ref(false);
    const weg = ref('');
    const hms = ref([]);
    const wegen = ref([]);
    const hm = ref("");
    const wegInput = ref("");
    const hmInput = ref("");
    let tmpWeg;

    const getRoads = async () => {
      const OUT = await fetch(`output/roads.json`);
      const ROADS = await OUT.json();
      console.log(ROADS);
      wegen.value = ROADS.roads;
    }

    const isAWeg = () => {
      return wegInput.value.toUpperCase().startsWith('A')
    }

    watch(wegInput, (wegInput, tmp) => {
      hmInput.value = '';
      tmpWeg = wegInput;
    })


    const handleBlur = async (test) => {
      console.log(test);
      console.log(" >>>> weg.value ", tmpWeg);

      // weg.value = weg.value.toUpperCase();
      try {
        console.log("weg.value ", weg.value);
        const OUT = await fetch(`output/${weg.value}.json`);
        const HMS = await OUT.json();
        console.log(HMS);
        hms.value = HMS.hms;
      } catch (e) {
        console.log("oops ", e);
      }
    }

    const selectHm = () => {
      console.log("hm ", hm.value);
      console.log("hm ", hm.value.location);
      fly(hm.value.location);
    }

    getRoads()

    return {expand, hms, hm, hmInput, weg, wegen, wegInput, handleBlur, selectHm, isAWeg}
  },
  computed: {},
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