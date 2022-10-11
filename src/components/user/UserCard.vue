<template>
  <v-card class="mx-auto">
    <v-subheader class="title text-right">
      {{ name }},  <span class="font-italic pl-2">{{ age }}</span>
    </v-subheader>
    <v-row class="pl-6 pt-3" v-if='showThumbOptions'>
      <Button
        color="success"
        rounded
        fab
        icon-left=""
        @click="$emit('thumb-up', user._id)"
      >
        <v-icon sm>mdi-thumb-up</v-icon>
      </Button>
      <Button
        color="error lighten-2"
        rounded
        fab
        class="ml-3"
        @click="$emit('thumb-down', user._id)"
      >
        <v-icon sm>mdi-thumb-down</v-icon>
      </Button>
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
        {{ Math.abs(likedAmount) }}
        <span class="font-weight-light ml-2">{{ likedMessage }}</span>
      </v-progress-linear>
    </v-row>
    <v-row>
      <v-col>
        <Avatar class="ml-5" :size="150" :user="user" />
      </v-col>
      <v-col>
          <Button
            v-if="showAddFriend"
            rounded
            @click="$emit('add-friend', user._id)"
            label="Add friend"
            icon-left="mdi-account-plus"
          />
          <slot />
      </v-col>
      <v-col>
        <Button
          v-if='showKick'
          rounded
          @click="$emit('kick', user._id)"
          class='ml-2'
          label="Remove"
          color="error"
          icon-left="mdi-cancel"
          text
        ></Button>
      </v-col>
    </v-row>
    <v-divider class="mt-2"></v-divider>
    <v-list>
      <template v-for="item in userDataList">
        <v-list-item v-if='item.show' :key="item.label">
          <v-list-item-action>
            <v-icon color="primary darken-1">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.value }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

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
    showThumb: {
      type: Boolean,
      default: true,
    },
    showKick: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({ currentUser: (state) => state.auth.user }),
    userDataList() {
      return [
        {
          label: 'Email',
          icon: 'mdi-email',
          value: this.user.email || 'Hidden',
          show: this.isMe,
        },
        {
          label: 'Sex',
          icon: 'mdi-gender-male-female',
          value: this.user.sex || 'Hidden',
          show: this.isMe,
        },
        {
          label: 'Birthday',
          icon: 'mdi-cake-variant',
          value: this.date,
          show: true,
        },
      ];
    },
    isMe() {
      return this.currentUser._id === this.user._id
    },
    likedMessage() {
      let prefix = Math.abs(this.likedAmount) === 1 ? 'person' : 'people';
      if (this.likedAmount >= 0) {
        prefix += ' liked';
      } else {
        prefix += ' disliked';
      }
      const sufix =
        this.isMe ? ' you.' : ' this user.';
      return prefix + sufix;
    },
    likedAmount() {
      const { user } = this;
      if (!user._id) return 0;
      if (user.thumbsUp.length) {
        return user.thumbsUp.length;
      }
      return user.thumbsDown.length ? -user.thumbsDown.length : 0;
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
      if(!this.currentUser || !this.currentUser.friend_requests) {
        return false;
      }

      const requests = this.currentUser.friend_requests.map(request => request._id || request);
      return requests.includes(this.user._id)
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
        this.user._id !== this.currentUser._id &&
        !this.friendRequestSent &&
        !this.friendRequestRecieved &&
        !this.isFriend
      );
    },
    showThumbOptions() {
      return (
        this.currentUser &&
        this.user._id &&
        this.user._id !== this.currentUser._id &&
        !this.user.thumbsUp.includes(this.currentUser._id) &&
        !this.user.thumbsDown.includes(this.currentUser._id) &&
        this.showThumb
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
      return this.userHidden
        ? 'Hidden'
        : moment().diff(moment(this.user.birth_date), 'years');
    },
    date() {
      return this.userHidden
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
