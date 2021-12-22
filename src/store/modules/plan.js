import axios from '@/axios';

export const plan = {
  state() {
    return {
      plans: [],
    };
  },
  mutations: {
    SET_PLANS(state, plans) {
      state.plans = plans;
    },
  },
  actions: {
    createPlan: (commit, { plan }) => {
      return axios.postUrl('/plan', plan);
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
  getters: {
    plans: (state) => state.plans,
  },
};
