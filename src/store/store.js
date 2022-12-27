import Vuex from 'vuex';
import modules from './modules';
import io from 'socket.io-client';

const { plan, auth, request, friend } = modules;

export default (Vue) => {
  Vue.use(Vuex);

  return new Vuex.Store({
    modules: {
      auth,
      plan,
      request,
      friend,
    },
    state() {
      return {
        keyboardActive: false,
      };
    },
    mutations: {
      SET_KEYBOARD_ACTIVE(state, shown) {
        state.keyboardActive = shown;
      },
    },
    getters: {
      keyboardActive: (state) => {
        return state.keyboardActive;
      },
    },
    actions: {
      setKeyboardActive: ({ commit }, { shown }) => {
        commit('SET_KEYBOARD_ACTIVE', shown);
      },
      newSocket: (store) => {
        const { token } = store.state.auth;
        const url =
          process.env.NODE_ENV === 'development'
            ? 'https://letsgo-api.com'
            : 'https://letsgo-api.com';
        return io(url, {
          transports: ['websocket', 'polling', 'flashsocket'],
          query: {
            token,
          },
        });
      },
    },
  });
};
