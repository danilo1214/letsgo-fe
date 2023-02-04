import axios from '@/axios';

export const request = {
  state() {
    return {};
  },
  actions: {
    createRequest: ({ commit }, { plan }) => {
      return axios.postUrl(`plan/${plan}/request`, plan).then((result) => {
        commit('UPDATE_PLAN', { id: result.data._id, data: result.data });
      });
    },
    acceptRequest: ({ commit }, { plan, user }) => {
      return axios
        .postUrl(`plan/${plan}/request/${user}/accept`, plan)
        .then((result) => {
          commit('UPDATE_PLAN', { id: result.data._id, data: result.data });
        });
    },
    declineRequest: ({ commit }, { plan, user }) => {
      return axios
        .postUrl(`plan/${plan}/request/${user}/decline`, plan)
        .then((result) => {
          commit('UPDATE_PLAN', { id: result.data._id, data: result.data });
        });
    },
    deleteRequest: ({ commit }, { plan }) => {
      return axios.deleteUrl(`plan/${plan}/request`, plan).then((result) => {
        commit('UPDATE_PLAN', { id: result.data._id, data: result.data });
      });
    },
  },
};
