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
        lastScrollAt: 0,
      };
    },
    mutations: {
      SET_KEYBOARD_ACTIVE(state, shown) {
        state.keyboardActive = shown;
      },
      SET_LAST_SCROLL_AT(state, lastScrollAt) {
        state.lastScrollAt = lastScrollAt;
      },
    },
    getters: {
      lastScrollAt: (state) => {
        return state.lastScrollAt;
      },
      keyboardActive: (state) => {
        return state.keyboardActive;
      },
    },
    actions: {
      setLastScrollAt: ({ commit }, { lastScrollAt }) => {
        commit('SET_LAST_SCROLL_AT', lastScrollAt);
      },
      setKeyboardActive: ({ commit }, { shown }) => {
        commit('SET_KEYBOARD_ACTIVE', shown);
      },
      newSocket: (store) => {
        const { token } = store.state.auth;
        const url =
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3003'
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
