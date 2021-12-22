import axios from '@/axios';

export const auth = {
  state() {
    return {
      token: '',
      user: null,
    };
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  getters: {
    signedIn: (state) => {
      return !!state.user;
    },
  },
  actions: {
    signOut: ({ commit }) => {
      axios.setToken('');
      localStorage.setItem('letsgo-jwt', null);
      commit('SET_TOKEN', '');
      commit('SET_USER', null);
    },
    signUp: ({ commit }, { user }) => {
      return axios
        .postUrl('/user', user)
        .then((response) => {
          const { token } = response.data;
          commit('SET_TOKEN', token);
          localStorage.setItem('letsgo-jwt', token);
          axios.setToken(token);

          return token;
        })
        .catch((err) => {
          throw err;
        });
    },
    signIn: ({ commit }, { email, password }) => {
      return axios
        .postUrl('/user/login', {
          email,
          password,
        })
        .then((response) => {
          const { token } = response.data;
          commit('SET_TOKEN', token);
          localStorage.setItem('letsgo-jwt', token);
          axios.setToken(token);

          return token;
        })
        .catch((err) => {
          throw err;
        });
    },
    verifySelfie: (commit, {formData}) => {
      return axios.postUrl('/user/photo', formData);
    },
    checkAuth: ({ commit }) => {
      const token = localStorage.getItem('letsgo-jwt');
      axios.setToken(token);
      return axios
        .getUrl('/user/authenticate')
        .then((result) => {
          const { data } = result;

          commit('SET_USER', data);
          commit('SET_TOKEN', token);
        })
        .catch((err) => {
          console.log(err.message);

          commit('SET_USER', null);
          commit('SET_TOKEN', null);
        });
    },
  },
};
