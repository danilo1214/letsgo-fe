import axios from '@/axios';
import { getData } from '../../helpers/requests';

export const friend = {
  state() {
    return {
      friends: [],
      friend_requests: [],
    };
  },
  getters: {
    friends: (state) => state.friends,
    friendRequests: (state) => state.friend_requests,
  },
  mutations: {
    SET_FRIENDS(state, friends) {
      state.friends = friends;
    },
    SET_FRIEND_REQUESTS(state, friendRequests) {
      state.friend_requests = friendRequests;
    },
    NEW_FRIEND_REQUEST(state, friendRequest) {
      state.friend_requests = [...state.friend_requests, friendRequest];
    },
  },
  actions: {
    getFriendsList: ({ commit }) => {
      return axios.getUrl('user/friends').then((result) => {
        const user = getData(result);
        commit('SET_FRIENDS', user.friends);
        commit('SET_FRIEND_REQUESTS', user.friend_requests);
      });
    },
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
