<template>
  <div class="mt-10">
    <v-tabs
      v-model="tab"
      class="rounded"
      background-color="primary accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#1">
        Members ({{ plan.members.length }})
        <v-icon>mdi-account-supervisor</v-icon>
      </v-tab>

      <v-tab href="#2" v-if="isMember">
        <v-badge v-if='plan.requests.length' color='error' :content='plan.requests.length'>
          Requests
        </v-badge>
        <template v-else>
          Requests
        </template>
        <v-icon>mdi-account-alert</v-icon>
      </v-tab>

      <v-tab href="#3" v-if="isMember">
        <v-badge v-if='unreadMessages' color='error' :content='unreadMessages'>
          Chat
        </v-badge>
        <template v-else>
          Chat
        </template>
        <v-icon>mdi-chat</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="tab-items">
      <v-tab-item value="1">
        <user-card
          class="mt-8"
          @thumb-up="(user) => $emit('thumb-up', user)"
          @thumb-down="(user) => $emit('thumb-down', user)"
          @add-friend="(user) => $emit('add-friend', user)"
          @kick="(user) => $emit('kick', user)"
          :show-kick='isAdmin && !isMe(member._id)'
          v-for="member in plan.members"
          :key="member._id"
          :user="member"
        />
      </v-tab-item>

      <v-tab-item value="2" v-if="isMember">
        <v-card flat>
          <request
            class="mt-8"
            @accept="(user) => $emit('accept', user)"
            @decline="(user) => $emit('decline', user)"
            @add-friend="(user) => $emit('add-friend', user)"
            v-for="request in plan.requests"
            :key="request._id"
            :user="request"
          />
        </v-card>
      </v-tab-item>

      <v-tab-item value="3" class="fill-height" v-if="isMember">
        <chat :plan="plan" @send="(e) => $emit('send', e)" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import UserCard from '../user/UserCard';
import Request from '../user/Request';
import Chat from './Chat';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'PlanDetailsTabs',
  components: { Chat, Request, UserCard },
  props: {
    isMember: {
      type: Boolean,
      required: true,
    },
    plan: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tab: '#2',
    };
  },
  computed: {
    ...mapState({ currentUser: (state) => state.auth.user }),
    isAdmin() {
      const userId = this.currentUser._id;
      const planAdminId = this.plan.admin._id || this.plan.admin;
      return userId === planAdminId;
    },
    unreadMessages() {
      const {plan, currentUser} = this;

      if (!plan.messages.length) {
        return 0;
      }

      let lastRead = plan.messages.length - 1;

      for(let i =  0; i < plan.messages.length; i++) {
        const message = plan.messages[i];
        const messageUserId = message.user._id || message.user;

        if (
          message.seen.includes(currentUser._id) ||
          messageUserId === currentUser._id
        ) {
          lastRead = i;
        }
      }

      return plan.messages.length - (lastRead + 1);
    }
  },
  methods: {
    ...mapActions(['seenMessage']),
    isMe(id){
      return this.currentUser && this.currentUser._id === id;
    },
    onSeenMessage() {
      const id = this.plan._id;
      if (this.plan.messages.length) {
        const messageId = this.plan.messages[this.plan.messages.length - 1]._id;
        this.seenMessage({
          id,
          messageId,
        });
      }
    },
  },
  watch: {
    tab(val) {
      if (val === '3') {
        this.onSeenMessage();
      }
    },
  },
};
</script>

<style scoped>
.tab-items {
  height: 500px;
  overflow-y: scroll;
}
</style>
