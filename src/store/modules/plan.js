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
    UPDATE_PLAN(state, { id, data }) {
      state.plans = state.plans.map((obj) => (obj._id === id ? data : obj));
    },
    ADD_PLAN(state, plan) {
      state.plans = state.plans.filter((p) => p._id !== plan._id);
      state.plans.push(plan);
    },
    DELETE_PLAN(state, id) {
      state.plans = state.plans.filter((plan) => plan._id !== id);
    },
  },
  actions: {
    createPlan: (store, { plan }) => {
      return axios.postUrl('/plan', plan);
    },
    getPlan: ({ commit }, { id }) => {
      return axios.getUrl(`plan/${id}`, {}).then((result) => {
        commit('ADD_PLAN', result.data);
      });
    },
    sendMessage: (store, { id, text }) => {
      const date = moment().format('YYYY-MM-DD HH:mm');
      return axios.postUrl(`plan/${id}/message`, {
        date,
        text,
      });
    },
    addMessage: ({ commit, getters }, { id, message }) => {
      const { plans } = getters;
      const plan = plans.find((p) => p._id === id);
      commit('UPDATE_PLAN', {
        id,
        data: {
          ...plan,
          messages: [...plan.messages, message],
        },
      });
    },
    loadPlans: ({ commit }, { query }) => {
      return axios
        .getUrl('/plan', {
          params: query,
        })
        .then((result) => {
          const { data } = result;

          commit('SET_PLANS', data);
          return data;
        });
    },
    deletePlan: ({ commit }, { id }) => {
      return axios.deleteUrl(`/plan/${id}`).then(() => {
        commit('DELETE_PLAN', id);
      });
    },
    uploadPlanImage: ({ commit }, { id, formData }) => {
      return axios.postUrl(`/plan/${id}/photo`, formData).then((result) => {
        commit('UPDATE_PLAN', { id, data: result.data });
      });
    },
    updatePlan: ({ commit }, { id, plan }) => {
      return axios.patchUrl(`/plan/${id}`, plan).then((result) => {
        commit('UPDATE_PLAN', { id, data: result.data });
      });
    },
    thumbUp: ({ commit }, { plan, user }) => {
      return axios.postUrl(`plan/${plan}/thumb/up/${user}`).then((result) => {
        commit('UPDATE_PLAN', { id: result._id, data: result.data });
      });
    },
    thumbDown: ({ commit }, { plan, user }) => {
      return axios.postUrl(`plan/${plan}/thumb/down/${user}`).then((result) => {
        commit('UPDATE_PLAN', { id: result._id, data: result.data });
      });
    },
  },
  getters: {
    plans: (state) => state.plans,
  },
};
