import Vuex from 'vuex';
import modules from './modules';
import io from 'socket.io-client';
const { plan, auth, request } = modules;

export default (Vue) => {
  Vue.use(Vuex);

  return new Vuex.Store({
    modules: {
      auth,
      plan,
      request,
    },
    actions: {
      newSocket: (store, { id }) => {
        const { token } = store.state.auth;
        const url =
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3003'
            : 'https://letsgo-backend-v1.herokuapp.com';
        return io(url, {
          transports: ['websocket'],
          query: {
            plan: id,
            token,
          },
        });
      },
    },
  });
};
