<template>
  <v-card flat class="plan-chat">
    <div class="plan-messages" ref="chat">
      <h2 class='mt-10 text-center' v-if="!plan.messages || plan.messages.length === 0">
        This is the chat for the plan {{ plan.caption }}, please be nice to
        everyone!
      </h2>
      <template v-for="(message, id) in plan.messages">
        <v-banner v-if="!myMessage(message)" class="message-banner" :key="id">
          <div class="ml-auto">
            <Avatar :user="getUser(message.user)" :size="70" />
          </div>
          <v-alert dark color="primary lighten-2" rounded class="mt-1">
            {{ message.text }}
            <div class="font-weight-light mt-1 body-2">{{ formatDate(message) }}</div>
          </v-alert>
        </v-banner>
        <v-banner v-else class="message-banner ml-auto" :key="id">
          <div class="ml-auto picture-wrapper">
            <Avatar :user="getUser(message.user)" :size="70" />
          </div>
          <v-alert dark color="success" rounded class="mt-3">
            {{ message.text }}
            <div class="font-weight-light mt-1 text-right body-2">
              {{ formatDate(message) }}
            </div>
          </v-alert>
        </v-banner>
      </template>
    </div>
    <v-row class="px-2" :style="getChatFooterStyle">
      <v-col cols="8" md="9">
        <v-text-field
          @keydown.enter.prevent="onSend"
          rounded
          filled
          dense
          clearable
          v-model.lazy="currentMessage"
          placeholder="Send message..."
        ></v-text-field>
      </v-col>
      <v-col cols="4" md="3">
        <Button
          class="ml-5"
          label="Send"
          rounded
          @click="onSend"
          :disabled="!currentMessage"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Avatar from '../user/Avatar';
import Button from '../generic/Button';
import moment from 'moment';
import { mapActions, mapGetters, mapState } from 'vuex';
import { Keyboard } from '@capacitor/keyboard';

export default {
  name: 'Chat',
  components: { Button, Avatar },
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentMessage: '',
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    ...mapGetters(['keyboardActive']),
    getChatFooterStyle() {
      return this.keyboardActive
        ? `position: fixed; bottom: 0; z-index: 9999999999`
        : '';
    },
    userMap() {
      let map = {};

      this.plan.members.forEach((member) => {
        map[member._id] = member;
      });

      return map;
    },
  },
  methods: {
    ...mapActions(['setKeyboardActive']),
    getUser(id) {
      return this.userMap[id] || {};
    },
    myMessage(message) {
      return message.user === this.user._id;
    },
    onSend() {
      this.$emit('send', this.currentMessage);
      this.currentMessage = '';
    },
    formatDate(message) {
      return message.date ? moment(message.date).fromNow() : 'No date';
    },
    scrollTop() {
      this.$refs.chat.scrollTop =
        this.$refs.chat.scrollHeight + this.$refs.chat.offsetHeight;
    },
    init() {
      Keyboard.addListener('keyboardWillShow', () => {
        this.setKeyboardActive({ shown: true });
      });
      Keyboard.addListener('keyboardWillHide', () => {
        this.setKeyboardActive({ shown: false });
      });
    },
  },
  mounted() {
    this.scrollTop();
    this.init();
  },
  updated() {
    this.scrollTop();
  },
  beforeDestroy() {
    Keyboard.removeAllListeners();
    this.setKeyboardActive({ shown: false });
  },
};
</script>

<style lang="scss">
.plan-messages {
  max-height: calc(
    100vh - env(safe-area-inset-top) - 2 * env(safe-area-inset-bottom) - 64px -
      24px - 75px - 80px
  );
  min-height: calc(
    100vh - env(safe-area-inset-top) - 2 * env(safe-area-inset-bottom) - 64px -
      24px - 75px - 80px
  );
  overflow-y: scroll;
}
.picture-wrapper {
  width: 70px;
}

.message-banner {
  width: 80%;
  .v-banner__wrapper {
    border: none !important;
  }
}
</style>
