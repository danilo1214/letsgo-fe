import axios from '@/axios';

export const friend = {
  state() {
    return {
      friends: [],
      invites: [],
      friend_requests: [],
    };
  },
  getters: {
    friends: (state) => state.friends,
    invites: (state) => state.invites,
    friendRequests: (state) => state.friend_requests,
  },
  mutations: {
    SET_FRIENDS(state, friends) {
      state.friends = friends;
    },
    SET_INVITES(state, invites) {
      console.log('settin invites', invites);
      state.invites = invites;
    },
    SET_FRIEND_REQUESTS(state, friendRequests) {
      state.friend_requests = friendRequests;
    },
    NEW_FRIEND_REQUEST(state, friendRequest) {
      state.friend_requests = [...state.friend_requests, friendRequest];
    },
  },
  actions: {
    sendFriendRequest: (store, { user }) => {
      return axios.postUrl(`user/${user}/friend/request`);
    },
    acceptFriendRequest: (store, { user }) => {
      return axios.postUrl(`user/${user}/friend/add`);
    },
    declineFriendRequest: (store, { user }) => {
      return axios.deleteUrl(`user/${user}/friend/decline`);
    },
    removeFriend: (store, { user }) => {
      return axios.deleteUrl(`user/${user}/friend/remove`);
    },
    newFriendRequest: ({ commit }, { request }) => {
      commit('NEW_FRIEND_REQUEST', request);
    },
  },
};
