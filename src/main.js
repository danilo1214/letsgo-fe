import Vue from 'vue';
import Store from './store/store';
import Application from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import Notifications from 'vue-notification';

Vue.config.productionTip = false;
console.log(Store(Vue));
const store = Store(Vue);
Vue.use(Notifications);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(Application),
}).$mount('#app');
