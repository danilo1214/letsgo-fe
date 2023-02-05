<template>
  <div>
    <v-tabs-items
      v-model="tab"
      :class="{ 'tab-items': true, 'is-hidden': !isMember }"
    >
      <v-tab-item value="1">
        <plan-card
          class="mt-10"
          :plan="plan"
          @join="$emit('join')"
          :show-link="false"
        />
      </v-tab-item>

      <v-tab-item value="2">
        <user-card
          class="mt-8"
          :show-thumb="isMember"
          @thumb-up="(user) => $emit('thumb-up', user)"
          @thumb-down="(user) => $emit('thumb-down', user)"
          @add-friend="(user) => $emit('add-friend', user)"
          @kick="(user) => $emit('kick', user)"
          :show-kick="isAdmin && !isMe(member._id)"
          v-for="member in plan.members"
          :key="member._id"
          :user="member"
        />
      </v-tab-item>

      <v-tab-item value="3" v-if="isMember">
        <v-card flat v-if="plan.requests.length">
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
        <h1 v-else class="mt-10 text-center">No new requests</h1>
      </v-tab-item>

      <v-tab-item value="4" class="fill-height" v-if="isMember">
        <chat :plan="plan" @send="(e) => $emit('send', e)" />
      </v-tab-item>
    </v-tabs-items>
    <v-tabs
      v-model="tab"
      :class="{
        'tab-bar': true,
        rounded: true,
        hidden: keyboardActive,
      }"
      centered
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#1">
        <v-icon>mdi-calendar</v-icon>
      </v-tab>

      <v-tab href="#2">
        <v-icon>mdi-account-supervisor</v-icon>
      </v-tab>

      <v-tab href="#3" v-if="isMember">
        <v-badge
          v-if="plan.requests.length"
          color="error"
          :content="plan.requests.length"
        >
          Requests
        </v-badge>
        <template v-else> </template>
        <v-icon>mdi-account-alert</v-icon>
      </v-tab>

      <v-tab href="#4" v-if="isMember">
        <v-badge
          v-if="newMessages.includes(plan._id)"
          color="error"
          content="!"
        >
        </v-badge>
        <v-icon>mdi-chat</v-icon>
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
import UserCard from '../user/UserCard';
import Request from '../user/Request';
import Chat from './Chat';
import { mapActions, mapGetters, mapState } from 'vuex';
import PlanCard from './PlanCard';

export default {
  name: 'PlanDetailsTabs',
  components: { PlanCard, Chat, Request, UserCard },
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
    ...mapGetters(['keyboardActive', 'newMessages']),
    isAdmin() {
      const userId = this.currentUser._id;
      const planAdminId = this.plan.admin._id || this.plan.admin;
      return userId === planAdminId;
    },
  },
  methods: {
    ...mapActions(['seenMessage']),
    isMe(id) {
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
      this.$emit('tab-change', val);
      if (val === '4') {
        this.onSeenMessage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-items {
  max-height: calc(
    100vh - env(safe-area-inset-top) - 2 * env(safe-area-inset-bottom) - 64px -
      24px - 75px
  );
  min-height: calc(
    100vh - env(safe-area-inset-top) - 2 * env(safe-area-inset-bottom) - 64px -
      24px - 75px
  );
  overflow-y: scroll;
  &.is-hidden {
    max-height: calc(
      100vh - env(safe-area-inset-top) - 2 * env(safe-area-inset-bottom) - 64px -
        24px - 75px - 72px
    );
    min-height: calc(
      100vh - env(safe-area-inset-top) - 2 * env(safe-area-inset-bottom) - 64px -
        24px - 75px - 72px
    );
  }
}

.tab-bar {
  position: fixed;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  width: 100vw;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  &.hidden {
    opacity: 0;
  }
}
</style>
