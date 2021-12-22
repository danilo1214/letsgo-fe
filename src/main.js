import Vue from 'vue';
import Store from './store/store';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false;
const store = new Store(Vue);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
