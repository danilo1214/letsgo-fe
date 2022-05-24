<template>
  <v-card class="mx-auto">
    <v-subheader class="title text-right"
      >{{ name }} <span class="font-italic pl-2">({{ age }})</span></v-subheader
    >
    <v-row class="pl-6 pt-3" v-if="showThumbOptions">
      <Button
        color="success"
        rounded
        prepe
        label="Good"
        icon-left="mdi-thumb-up"
        @click="$emit('thumb-up', user._id)"
      />
      <Button
        color="error lighten-2"
        rounded
        class="ml-3"
        label="Bad"
        icon-left="mdi-thumb-down"
        @click="$emit('thumb-down', user._id)"
      />
    </v-row>
    <v-row class="pt-3 pl-6">
      <v-progress-linear
        class="liked-percentage"
        rounded
        color="success"
        background-color="info"
        :value="likedPercentage"
        height="25"
        dark
      >
        {{ likedAmount }} people
        <span class="font-weight-light ml-2">{{
          likedMessage
        }}</span></v-progress-linear
      >
    </v-row>
    <v-row>
      <v-col>
        <Avatar class="ml-5" :size="150" :user="user" />
      </v-col>
      <v-col>
        <v-col>
          <Button
            v-if="
              showAddFriend &&
              !friendRequestSent &&
              !friendRequestRecieved &&
              !isFriend
            "
            @click="$emit('add-friend', user._id)"
            label="Add friend"
            icon-left="mdi-account-plus"
          />
          <slot />
        </v-col>
      </v-col>
    </v-row>
    <v-divider class="mt-2"></v-divider>
    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary darken-1">mdi-email</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.email || 'Hidden' }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary darken-1">mdi-gender-male-female</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.sex || '?' }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary darken-1">mdi-cake-variant</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ date }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import Avatar from './Avatar';
import moment from 'moment';
import Button from '../generic/Button';
import { mapState } from 'vuex';

export default {
  name: 'UserCard',
  components: { Button, Avatar },
  props: {
    user: {
      type: Object,
      required: true,
    },
    showLike: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({ currentUser: (state) => state.auth.user }),
    likedMessage() {
      return this.currentUser._id === this.user._id
        ? 'liked you.'
        : 'liked this user.';
    },
    likedAmount() {
      if (!this.user._id) return 0;
      return this.user.thumbsUp.length;
    },
    likedPercentage() {
      if (!this.user._id) return 0;
      const thumbsUp = this.user.thumbsUp.length;
      const thumbsDown = this.user.thumbsDown.length;
      if (thumbsUp === 0 && thumbsDown === 0) return 0;
      return (100 * thumbsUp) / (thumbsUp + thumbsDown);
    },
    friendRequestSent() {
      return (
        this.currentUser &&
        this.user.friend_requests &&
        this.user.friend_requests.includes(this.currentUser._id)
      );
    },
    friendRequestRecieved() {
      return (
        this.currentUser &&
        this.currentUser.friend_requests &&
        this.currentUser.friend_requests.includes(this.user._id)
      );
    },
    isFriend() {
      return (
        this.currentUser &&
        this.user.friends &&
        this.user.friends.includes(this.currentUser._id)
      );
    },
    showAddFriend() {
      return (
        this.currentUser &&
        this.user._id &&
        this.user._id !== this.currentUser._id
      );
    },
    showThumbOptions() {
      return (
        this.currentUser &&
        this.user._id &&
        this.user._id !== this.currentUser._id &&
        !this.user.thumbsUp.includes(this.currentUser._id) &&
        !this.user.thumbsDown.includes(this.currentUser._id) &&
        this.showLike
      );
    },
    userHidden() {
      return !this.user.birth_date;
    },
    name() {
      return this.userHidden
        ? 'Hidden'
        : `${this.user.first_name} ${this.user.last_name}`;
    },
    age() {
      return !this.user.birth_date
        ? 'Hidden'
        : moment().diff(moment(this.user.birth_date), 'years');
    },
    date() {
      return !this.user.birth_date
        ? 'Hidden'
        : moment(this.user.birth_date).format('YYYY-MM-DD');
    },
    photo() {
      return this.user.photo_url || '../../assets/default.jpg';
    },
  },
};
</script>

<style scoped>
.liked-percentage {
  width: 200px;
}
</style>
