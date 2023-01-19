<template>
  <v-card class="mx-auto" max-width="700" :id='`user-${user._id}`'>
    <v-row class="mt-6">
      <v-col cols='2'>
        <Avatar class="ml-2" :size="avatarSize" :user="avatar" />
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols='10'>
        <v-row class='user-right-column'>
          <slot />
          <v-menu :attach='`#user-${user._id}`' v-if="showMenu" :left='true'>
            <template v-slot:activator="{ on, attrs }">
              <Button
                icon
                color="info"
                v-bind="attrs"
                v-on="on"
                @click.stop.prevent
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </Button>
            </template>

            <v-list>
              <v-list-item v-if="showAddFriend">
                <Button
                  rounded
                  icon-left="mdi-account-plus"
                  label="Add Friend"
                  @click="$emit('add-friend', user._id)"
                >
                </Button>
              </v-list-item>

              <v-list-item v-if="showKick">
                <Button
                  rounded
                  @click="$emit('kick', user._id)"
                  label="Remove"
                  color="error"
                  icon-left="mdi-cancel"
                  text
                ></Button>
              </v-list-item>

              <v-list-item v-if="showReport">
                <Button
                  rounded
                  @click="reportModal = true"
                  label="Report"
                  color="error"
                  icon-left="mdi-account-alert"
                  text
                ></Button>
              </v-list-item>

              <slot name="menu" />
            </v-list>
          </v-menu>
        </v-row>
      </v-col>
    </v-row>
    <v-subheader class="title text-center">
      {{ name }}, <span class="v-size--small pl-3">{{ age }}</span>
    </v-subheader>
    <div class="mt-5">
      <v-row class="pl-6" v-if="showThumbOptions">
        <Button
          color="success"
          rounded
          small
          fab
          icon-left=""
          @click="$emit('thumb-up', user._id)"
        >
          <v-icon sm>mdi-thumb-up</v-icon>
        </Button>
        <Button
          color="info"
          rounded
          small
          fab
          class="ml-3"
          @click="$emit('thumb-down', user._id)"
        >
          <v-icon sm>mdi-thumb-down</v-icon>
        </Button>
      </v-row>
      <v-row class="pt-2 pl-6">
        <v-progress-linear
          class="liked-percentage"
          rounded
          color="success"
          background-color="info"
          :value="likedPercentage"
          height="25"
          dark
        >
          {{ Math.abs(likedAmount) }} {{ likedMessage }}
        </v-progress-linear>
      </v-row>
    </div>
    <v-divider class="mt-10"></v-divider>
    <v-list>
      <template v-for="item in userDataList">
        <v-list-item v-if="item.show" :key="item.label">
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

    <Dialog
      v-model="reportModal"
      title="Report user"
      icon="mdi-account-alert"
      color="error"
    >
      <report-user-form @cancel="reportModal = false" @ok="onReport" />
    </Dialog>
  </v-card>
</template>

<script>
import Avatar from './Avatar';
import moment from 'moment';
import Button from '../generic/Button';
import { mapActions, mapGetters, mapState } from 'vuex';
import Dialog from '../generic/Dialog';
import ReportUserForm from './ReportUserForm';

export default {
  name: 'UserCard',
  components: { ReportUserForm, Dialog, Button, Avatar },
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
  data() {
    return {
      reportModal: false,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    ...mapState({ currentUser: (state) => state.auth.user }),
    ...mapGetters(['friendRequests']),
    avatar() {
      if(this.user._id) {
        return this.user;
      }

      return {};
    },
    avatarSize() {
      return  this.windowWidth > 700? 130 : 45;
    },
    showMenu() {
      return (
        this.showAddFriend ||
        this.showKick ||
        !!this.$slots.menu ||
        this.showReport
      );
    },
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
    showReport() {
      return !!this.currentUser && !this.isMe;
    },
    isMe() {
      return this.currentUser._id === this.user._id;
    },
    likedMessage() {
      if (this.likedAmount >= 0) {
        return '👍🏻';
      } else {
        return '👎🏻';
      }
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
      if (!this.friendRequests) {
        return false;
      }

      const requests = this.friendRequests.map(
        (request) => request._id || request
      );
      return requests.includes(this.user._id);
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
        this.user._id !== undefined &&
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
  methods: {
    ...mapActions(['reportUser']),
    onReport(description) {
      this.reportModal = false;
      this.reportUser({
        report: {
          description,
          user: this.user._id,
        },
      });
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    console.log(this.user._id)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped>
.liked-percentage {
  width: 200px;
}

.user-right-column {
  justify-content: right;
  margin-right: 5px;
}
</style>
