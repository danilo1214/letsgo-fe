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
    leavePlan: ({ commit }, { id }) => {
      return axios.postUrl(`plan/${id}/leave`).then((result) => {
        commit('UPDATE_PLAN', { id: result.data._id, data: result.data });
      });
    },
    kickUser: ({ commit }, { id, user }) => {
      return axios.postUrl(`plan/${id}/remove/${user}`).then((result) => {
        commit('UPDATE_PLAN', { id: result.data._id, data: result.data });
      });
    },
    seenMessage: ({ commit }, { id, messageId }) => {
      return axios
        .postUrl(`plan/${id}/message/${messageId}/seen`)
        .then((result) => {
          commit('UPDATE_PLAN', { id: result.data._id, data: result.data });
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
    loadPlans: (state, { query }) => {
      return axios.getUrl('/plan', {
        params: query,
      });
    },
    getMyPlans: ({ commit }) => {
      return axios
        .getUrl('/plan/my', {
          params: {
            old: true,
          },
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
    updatePlanLocal: ({ commit }, { id, plan }) => {
      commit('UPDATE_PLAN', { id, data: plan });
    },
    updatePlan: ({ commit }, { id, plan }) => {
      return axios.patchUrl(`/plan/${id}`, plan).then((result) => {
        commit('UPDATE_PLAN', { id, data: result.data });
      });
    },
    inviteFriend: (store, { plan, user }) => {
      return axios.postUrl(`plan/${plan}/invite/${user}`);
    },
    acceptInvite: (store, { plan }) => {
      return axios.postUrl(`plan/${plan}/invite/accept`);
    },
    declineInvite: (store, { plan }) => {
      return axios.postUrl(`user/invites/${plan}/decline`);
    },
    thumbUp: ({ commit }, { plan, user }) => {
      return axios.postUrl(`plan/${plan}/thumb/up/${user}`).then((result) => {
        commit('UPDATE_PLAN', { id: result.data._id, data: result.data });
      });
    },
    thumbDown: ({ commit }, { plan, user }) => {
      return axios.postUrl(`plan/${plan}/thumb/down/${user}`).then((result) => {
        commit('UPDATE_PLAN', { id: result.data._id, data: result.data });
      });
    },
  },
  getters: {
    newMessages: (state, getters, rootState) => {
      const { plans } = state;
      const { user } = rootState.auth;

      let uniqueMessages = 0;

      for (const plan of plans) {
        if (!plan.messages.length) {
          continue;
        }
        const lastMessage = plan.messages[plan.messages.length - 1];
        const lastMessageUserId = lastMessage.user._id || lastMessage.user;
        if (
          !lastMessage.seen.includes(user._id) &&
          !(lastMessageUserId === user._id)
        ) {
          uniqueMessages += 1;
        }
      }

      return uniqueMessages;
    },
    newRequests: (state, getters) => {
      const { adminPlans } = getters;
      let requests = 0;

      for (const plan of adminPlans) {
        requests += plan.requests.length;
      }

      return requests;
    },
    plans: (state) => state.plans,
    oldPlans: (state) =>
      state.plans.filter((plan) => !moment().isBefore(moment(plan.date))),
    upcomingPlans: (state) =>
      state.plans.filter((plan) => moment().isBefore(moment(plan.date))),
    adminPlans: (state, getters, rootState) =>
      rootState.auth.user
        ? state.plans.filter(
            (plan) =>
              plan.admin === rootState.auth.user._id ||
              plan.admin._id === rootState.auth.user._id
          )
        : [],
  },
};
