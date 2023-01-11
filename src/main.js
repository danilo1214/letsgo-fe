import Vue from 'vue';
import Store from './store/store';
import Application from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import Notifications from 'vue-notification';
import InfiniteScroll from 'vue-infinite-scroll';

Vue.config.productionTip = false;

const store = Store(Vue);

Vue.use(Notifications);
Vue.use(InfiniteScroll);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(Application),
}).$mount('#app');
