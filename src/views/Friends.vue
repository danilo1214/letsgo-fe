<template>
  <div class="pa-10">
    <v-subheader>Friends({{ friends.length }})</v-subheader>
    <v-divider></v-divider>
    <user-card
      v-for="user in friends"
      :key="user._id"
      :user="user"
      @thumb-up="onThumbUp(user)"
      @thumbDown="onThumbDown(user)"
    >
      <Button
        label="Remove friend"
        icon-left="mdi-account-minus"
        @click="onRemove(user)"
      />
    </user-card>

    <v-subheader class="mt-16">Requests({{ friendRequests.length }})</v-subheader>
    <v-divider></v-divider>
    <user-card
      v-for="user in friendRequests"
      :key="user._id"
      :user="user"
      :show-like="false"
    >
      <v-card-actions>
        <Button
          label="Accept"
          color="success"
          icon-left="mdi-check"
          @click="onAccept(user)"
        />
        <Button
          label="Decline"
          color="error"
          icon-left="mdi-cancel"
          text
          @click="onDecline(user)"
        />
      </v-card-actions>
    </user-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UserCard from '../components/user/UserCard';
import Button from '../components/generic/Button';

export default {
  name: 'Friends',
  components: { Button, UserCard },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(['friends', 'friendRequests'])
  },
  methods: {
    ...mapActions([
      'getFriendsList',
      'acceptFriendRequest',
      'declineFriendRequest',
      'removeFriend',
      'sendThumbsUp',
      'sendThumbsDown',
    ]),
    async onThumbUp(user) {
      await this.sendThumbsUp({ user: user._id });
      this.init();
    },
    async onThumbDown(user) {
      await this.sendThumbsDown({ user: user._id });
      this.init();
    },
    async onAccept(user) {
      await this.acceptFriendRequest({ user: user._id });
      this.init();
    },
    async onDecline(user) {
      await this.declineFriendRequest({ user: user._id });
      this.init();
    },
    async onRemove(user) {
      await this.removeFriend({ user: user._id });
      this.init();
    },
    init() {
      this.getFriendsList();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped></style>
