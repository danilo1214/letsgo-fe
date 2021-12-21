import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#648ae0',
        secondary: '#424242',
        accent: '#B2AC88',
        error: '#c45d5d',
        info: '#879ba7',
        success: '#659da0',
        warning: '#f5d06f',
      },
    },
  },
});
