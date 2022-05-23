import axios from '@/axios';

export const friend = {
  state() {
    return {};
  },
  actions: {
    getFriendsList: () => {
      return axios.getUrl('user/friends');
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
  },
};
