import Vue from 'vue';
import Store from './store/store';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import Notifications from 'vue-notification';

Vue.config.productionTip = false;
const store = new Store(Vue);
Vue.use(Notifications);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
