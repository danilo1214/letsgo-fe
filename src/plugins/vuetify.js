import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#6475e0',
        secondary: '#424242',
        accent: '#e09a64',
        error: '#e06473',
        info: '#879ba7',
        success: '#64e0c3',
        warning: '#e0d864',
      },
    },
  },
});
