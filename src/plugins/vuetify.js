import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const COLORS = {
    theme: {
        themes: {
            light: {
                primary: '#00715a',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
}

export default new Vuetify(COLORS);
