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
    actions: {
      newSocket: (store) => {
        const { token } = store.state.auth;
        const url =
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3003'
            : 'https://letsgo-backend-v1.herokuapp.com';
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
