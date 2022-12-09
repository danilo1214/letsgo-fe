<template>
  <div class="pa-10">
    <search-users />
    <v-subheader>Friends({{ friends.length }})</v-subheader>
    <v-divider></v-divider>
    <user-card
      class="mt-6"
      v-for="user in friends"
      :key="user._id"
      :user="user"
      @thumb-up="onThumbUp(user)"
      @thumb-down="onThumbDown(user)"
    >
      <Button
        rounded
        class="ml-10 mb-3"
        label="Remove"
        icon-left="mdi-account-minus"
        @click="onRemove(user)"
      />
    </user-card>

    <v-subheader class="mt-16">
      Friend Requests({{ friendRequests.length }})
    </v-subheader>
    <v-divider></v-divider>
    <user-card
      v-for="user in friendRequests"
      :key="user._id"
      :user="user"
      :show-thumb="false"
    >
      <v-card-actions>
        <Button
          rounded
          label="Accept"
          color="success"
          icon-left="mdi-check"
          @click="onAccept(user)"
        />
        <Button
          rounded
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
import SearchUsers from '../components/user/SearchUsers';

export default {
  name: 'Friends',
  components: { SearchUsers, Button, UserCard },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['friends', 'friendRequests']),
  },
  methods: {
    ...mapActions([
      'loadFriendsList',
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
      await this.removeFriend({ user: user._id }).then(() => {
        this.$notify({
          group: 'main',
          title: 'Removed friend',
          text: 'Successfully removed friend.',
          type: 'success',
        });
      });
      this.init();
    },
    init() {
      this.loadFriendsList();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped></style>
