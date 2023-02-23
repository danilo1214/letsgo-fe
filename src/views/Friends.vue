<template>
  <div class="pa-8">
    <div class="mb-10" v-if="friendRequests.length">
      <v-subheader>
        Friend Requests
        <v-badge class="ma-1" color="error" :content="friendRequests.length" />
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
            x-small
            label="Decline"
            color="error"
            icon-left="mdi-cancel"
            text
            @click="onDecline(user)"
          />
          <Button
            rounded
            x-small
            label="Accept"
            color="success"
            icon-left="mdi-check"
            @click="onAccept(user)"
          />
        </v-card-actions>
      </user-card>
    </div>

    <v-subheader>Friends({{ friends.length }})</v-subheader>
    <v-divider></v-divider>
    <Button
      @click="onAddFriend"
      rounded
      class="ml-5 mt-10 mb-5"
      label="Add friends"
      icon-left="mdi-account-plus"
    ></Button>
    <search-users v-model="showAddFriend" class="mt-4 mb-15" />
    <template v-if="friends.length">
      <user-card
        class="mt-6"
        v-for="user in friends"
        :key="user._id"
        :user="user"
        @thumb-up="onThumbUp(user)"
        @thumb-down="onThumbDown(user)"
      >
        <Button
          small
          rounded
          class="ml-10 mb-3"
          label="Remove"
          icon-left="mdi-account-minus"
          @click="onShowRemove(user)"
        />
      </user-card>
      <confirm-dialog
        :dialog="showRemove"
        entity="user"
        name-key="first_name"
        icon="mdi-account-minus"
        action="unfriend"
        :data="removeUserData"
        @ok="onRemoveConfirm"
        @cancel="onRemoveCancel"
      ></confirm-dialog>
    </template>

    <h1 v-else class="text-center">You have no friends</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UserCard from '../components/user/UserCard';
import Button from '../components/generic/Button';
import SearchUsers from '../components/user/SearchUsers';
import ConfirmDialog from '../components/generic/ConfirmDialog';

export default {
  name: 'Friends',
  components: { ConfirmDialog, SearchUsers, Button, UserCard },
  data() {
    return {
      showRemove: false,
      removeUserData: {},
      showAddFriend: false,
    };
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
    onShowRemove(user) {
      this.showRemove = true;
      this.removeUserData = user;
    },
    onRemoveCancel() {
      this.showRemove = false;
      this.removeUserData = {};
    },
    onRemoveConfirm() {
      this.onRemove(this.removeUserData);
      this.onRemoveCancel();
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
    onAddFriend() {
      this.showAddFriend = true;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped></style>
