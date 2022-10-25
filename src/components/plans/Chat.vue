<template>
  <v-card flat class="plan-chat">
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
    <v-row class="pa-5 pa-md-10 mb-10 mt-5">
        <v-col cols='8' md='9'>
          <v-text-field
            rounded
            filled
            dense
            clearable
            v-model.lazy="currentMessage"
            placeholder="Send message..."
          ></v-text-field>
        </v-col>
        <v-col cols='4' md='3'>
          <Button
            class='ml-5'
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
      currentMessage: '',
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
    scrollTop() {
      this.$refs.chat.scrollTop =
        this.$refs.chat.scrollHeight + this.$refs.chat.offsetHeight;
    },
  },
  mounted() {
    this.scrollTop();
  },
  updated() {
    this.scrollTop();
  },
};
</script>

<style lang="scss">


.plan-messages {
  max-height: 40vh;
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
