<template>
  <v-container>
    <v-snackbar v-model="snackbar" color="primary" timeout="5000">
      {{ snackText }}
      <v-progress-linear
          v-if="snackText === 'momentje'"
          color="white accent-4"
          indeterminate
          rounded
          height="6"
      ></v-progress-linear>
    </v-snackbar>

    <div id="menu">
      <v-card v-if="expand" class="right" max-width="300">
        <v-card-actions>
          <v-chip v-if="weg" class="ma-2" :color="isAWeg() ? 'red' : 'yellow'" dark label
                  :text-color="isAWeg() ? 'white': 'black'">{{ weg.toUpperCase() }}
          </v-chip>
          <v-chip v-if="hm && hm.text" class="ma-2" color="primary" label text-color="white"><strong>{{
              hm.text
            }}</strong></v-chip>
          <v-spacer></v-spacer>
          <v-btn class="mt-n2" text fab @click="expand = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-text-field v-model="weg" label="weg" class="mr-2" outlined color="primary"></v-text-field>
          <v-text-field v-model="hm" color="primary" label="paal" outlined></v-text-field>
        </v-card-actions>
        <v-card-actions>
          <v-btn @click="go" outlined block>GAAN</v-btn>
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

const BASE = `https://geodata.nationaalgeoregister.nl/locatieserver/v3/free?q=type:hectometerpaal&fq=`

export default {
  setup() {
    const expand = ref(false);
    const snackbar = ref(false);
    const snackText = ref('');
    const weg = ref('A4');
    const hms = ref([]);
    const wegen = ref([]);
    const hm = ref("44.0");
    const wegInput = ref("");
    const hmInput = ref("");
    let tmpWeg;

    const go = async () => {
      const SEARCH = `${weg.value}-${hm.value.replace(",", "").replace(".", "")}`
      console.log(SEARCH);
      snackbar.value = true;
      snackText.value = "momentje"
      try {
        const OUT = await fetch(`${BASE}"${SEARCH}"`);
        const HMS = await OUT.json();
        console.log(HMS);
        snackbar.value = true;
        if (HMS.response.numFound === 0) {
          snackText.value = "Oops, niets gevonden."
        } else {
          if (HMS.response.numFound === 1) {
            snackText.value = `Eén paal gevonden`
          } else {
            snackText.value = `${HMS.response.numFound} resulaten`
          }
          const COORDINATE = HMS.response.docs[0].centroide_ll.replace("POINT(", "").replace(")", "").split(" ");
          console.log(COORDINATE);
          fly(COORDINATE)
        }
        hms.value = HMS.hms;
      } catch (e) {
        console.log("oops ", e);
      }
    }

    const getRoads = async () => {
      const OUT = await fetch(`output/roads.json`);
      const ROADS = await OUT.json();
      console.log(ROADS);
      wegen.value = ROADS.roads;
    }

    const isAWeg = () => {
      return weg.value.toUpperCase().startsWith('A')
    }

    watch(weg, (weg, tmp) => {
      hmInput.value = '';
      tmpWeg = wegInput;
    });

    const handleBlur = async (test) => {
      console.log(test);
      console.log(" >>>> weg.value ", tmpWeg);

      weg.value = weg.value.toUpperCase();

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

    return {expand, hms, hm, hmInput, weg, wegen, wegInput, snackbar, snackText, handleBlur, selectHm, isAWeg, go}
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