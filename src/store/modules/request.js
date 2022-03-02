import axios from '@/axios';

export const request = {
  state() {
    return {};
  },
  actions: {
    createRequest: (store, { plan }) => {
      return axios.postUrl(`plan/${plan}/request`, plan);
    },
    acceptRequest: (store, { plan, user }) => {
      return axios.postUrl(`plan/${plan}/request/${user}/accept`, plan);
    },
    declineRequest: (store, { plan, user }) => {
      return axios.postUrl(`plan/${plan}/request/${user}/decline`, plan);
    },
    deleteRequest: (store, { plan }) => {
      return axios.postUrl(`plan/${plan}/request/delete`, plan);
    },
  },
};
