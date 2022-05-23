<template>
  <div class="pa-10">
    <v-subheader>Friends({{ friends.length }})</v-subheader>
    <v-divider></v-divider>
    <user-card v-for="user in friends" :key="user._id" :user="user">
      <Button
        label="Remove friend"
        icon-left="mdi-account-minus"
        @click="removeFriend({ user: user._id })"
      />
    </user-card>

    <v-subheader class="mt-16">Requests({{ requests.length }})</v-subheader>
    <v-divider></v-divider>
    <user-card
      v-for="user in requests"
      :key="user._id"
      :user="user"
      :show-like="false"
    >
      <v-card-actions>
        <Button
          label="Accept"
          color="success"
          icon-left="mdi-check"
          @click="acceptFriendRequest({ user: user._id })"
        />
        <Button
          label="Decline"
          color="error"
          icon-left="mdi-cancel"
          text
          @click="declineFriendRequest({ user: user._id })"
        />
      </v-card-actions>
    </user-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getData } from '@/helpers/requests';
import UserCard from '../components/user/UserCard';
import Button from '../components/generic/Button';

export default {
  name: 'Friends',
  components: { Button, UserCard },
  data() {
    return {
      user: {
        friends: [],
        friend_requests: []
      },
    };
  },
  computed: {
    friends() {
      return this.user.friends;
    },
    requests() {
      return this.user.friend_requests;
    },
  },
  methods: {
    ...mapActions([
      'getFriendsList',
      'acceptFriendRequest',
      'declineFriendRequest',
      'removeFriend',
    ]),
    init() {
      this.getFriendsList().then((result) => {
        this.user = getData(result);
      });
    },
  },
};
</script>

<style scoped></style>
