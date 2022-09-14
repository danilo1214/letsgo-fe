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
        Requests ({{ plan.requests.length }})
        <v-icon>mdi-account-alert</v-icon>
      </v-tab>

      <v-tab href="#3" v-if="isMember">
        Chat
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
import { mapActions } from 'vuex';

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
  methods: {
    ...mapActions(['seenMessage']),
    onSeenMessage() {
      const id = this.plan._id;
      if (this.plan.messages.length) {
        console.log(this.plan.messages, this.plan.messages.length - 1);
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
