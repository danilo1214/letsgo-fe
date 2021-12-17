import Vuex from 'vuex';
import axios from '@/axios';

export default (Vue) => {
  Vue.use(Vuex);

  return new Vuex.Store({
    state: {
      token: '',
      user: null,
      plans: [],
    },
    mutations: {
      SET_TOKEN(state, token) {
        state.token = token;
      },
      SET_USER(state, user) {
        state.user = user;
      },
      SET_PLANS(state, plans) {
        state.plans = plans;
      },
    },
    getters: {
      signedIn: (state) => {
        return !!state.user;
      },
      plans: (state) => state.plans,
    },
    actions: {
      createPlan: (commit, { plan }) => {
        return axios.postUrl('/plan', plan);
      },
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
      loadPlans: ({ commit }, { query }) => {
        return axios
          .getUrl('/plan', {
            params: {
              ...query,
            },
          })
          .then((result) => {
            const { data } = result;

            commit('SET_PLANS', data);
            return data;
          });
      },
      deletePlan: ({ commit, getters }, { id }) => {
        return axios.deleteUrl(`/plan/${id}`).then(() => {
          const { plans } = getters;
          const newPlans = plans.filter((plan) => plan._id !== id);

          commit('SET_PLANS', newPlans);
        });
      },
    },
  });
};
