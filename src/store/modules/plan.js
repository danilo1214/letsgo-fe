import axios from '@/axios';
import moment from 'moment';

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
    createPlan: (store, { plan }) => {
      return axios.postUrl('/plan', plan);
    },
    getPlan: (store, { id }) => {
      return axios.getUrl(`plan/${id}`, {});
    },
    sendMessage: (store, { id, text }) => {
      const date = moment().format("YYYY-MM-DD HH:mm");
      return axios.postUrl(`plan/${id}/message`, {
        date,
        text
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
    uploadPlanImage: ({ commit, getters }, { id, formData }) => {
      return axios.postUrl(`/plan/${id}/photo`, formData).then((result) => {
        const { plans } = getters;
        const newPlans = plans.map((obj) =>
          obj._id === id ? result.data : obj
        );
        commit('SET_PLANS', newPlans);
      });
    },
    updatePlan: ({ commit, getters }, { id, plan }) => {
      return axios.patchUrl(`/plan/${id}`, plan).then((result) => {
        const { plans } = getters;
        const newPlans = plans.map((obj) =>
          obj._id === id ? result.data : obj
        );
        commit('SET_PLANS', newPlans);
      });
    },
  },
  getters: {
    plans: (state) => state.plans,
  },
};
