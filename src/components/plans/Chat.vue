<template>
  <v-card flat class="fill-height">
    <div class="plan-messages" ref="chat">
      <template v-for="(message, id) in plan.messages">
        <v-banner v-if="!myMessage(message)" class="message-banner" :key="id">
          <div class="ml-auto">
            <Avatar :user="message.user" :size="70" />
          </div>
          <v-alert dark color="primary lighten-2" rounded class="mt-1">
            {{ message.text }}
            <div class="font-weight-light mt-1">{{ formatDate(message) }}</div>
          </v-alert>
        </v-banner>
        <v-banner v-else class="message-banner ml-auto" :key="id">
          <div class="ml-auto picture-wrapper">
            <Avatar :user="message.user" :size="70" />
          </div>
          <v-alert dark color="success" rounded class="mt-3">
            {{ message.text }}
            <div class="font-weight-light mt-3 text-right">
              {{ formatDate(message) }}
            </div>
          </v-alert>
        </v-banner>
      </template>
    </div>
    <v-row class="pa-5">
      <template v-if="plan.messages">
        <v-text-field
          rounded
          filled
          dense
          clearable
          class="mt-5 search-text"
          v-model.lazy="currentMessage"
          placeholder="Send message..."
        ></v-text-field>
        <Button
          class="mt-5 ml-5"
          label="Send"
          rounded
          @click="onSend"
          :disabled="!currentMessage"
        />
      </template>
    </v-row>
  </v-card>
</template>

<script>
import Avatar from '../user/Avatar';
import Button from '../generic/Button';
import moment from 'moment';
import { mapState } from 'vuex';

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
      currentMessage: ''
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
  },
  methods: {
    myMessage(message) {
      return message.user._id === this.user._id;
    },
    onSend() {
      this.$emit('send', this.currentMessage);
      this.currentMessage = '';
    },
    formatDate(message) {
      return message.date ? moment(message.date).fromNow() : 'No date';
    },
  },
  mounted() {
    this.$refs.chat.scrollTop =
      this.$refs.chat.scrollHeight + this.$refs.chat.offsetHeight;
  },
  updated() {
    this.$refs.chat.scrollTop =
      this.$refs.chat.scrollHeight + this.$refs.chat.offsetHeight;
  },
};
</script>

<style lang="scss">
.plan-messages {
  height: 70%;
  overflow-y: scroll;
}
.picture-wrapper {
  width: 70px;
}

.message-banner {
  width: 40%;
  .v-banner__wrapper {
    border: none !important;
  }
}
</style>
