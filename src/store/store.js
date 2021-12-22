import Vuex from 'vuex';
import modules from './modules';
const { plan, auth } = modules;

export default (Vue) => {
  Vue.use(Vuex);

  return new Vuex.Store({
    modules: {
      auth,
      plan,
    },
  });
};
