import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3c7ec1',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#d97d7d',
        info: '#2196F3',
        success: '#659da0',
        warning: '#f5d06f',
      },
    },
  },
});
