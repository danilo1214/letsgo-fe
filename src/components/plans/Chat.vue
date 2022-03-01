<template>
  <v-card flat>
    <div class='plan-messages' ref='chat'>
      <v-banner v-for='(message, id) in plan.messages' :key='id' class='message-banner'>
        <Avatar :user='message.user' :size='70'/>
        {{formatDate(message)}}
        <v-alert dark color='primary lighten-2' rounded class = 'mt-3'>{{message.text}}</v-alert>
      </v-banner>
    </div>
    <v-row>
      <v-text-field
        rounded
        filled
        dense
        clearable
        class="mt-5 search-text"
        v-model.lazy="currentMessage"
        placeholder="Send message..."
      ></v-text-field>
      <Button class='mt-5 ml-5' label='Send' rounded @click="onSend"/>
    </v-row>
  </v-card>
</template>

<script>
import Avatar from '../user/Avatar';
import Button from '../generic/Button';
import moment from 'moment';

export default {
  name: 'Chat',
  components: { Button, Avatar },
  props: {
    plan: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentMessage: ''
    }
  },
  methods: {
    onSend() {
      this.$emit('send', this.currentMessage);
      this.currentMessage = '';
    },
    formatDate(message) {
      return message.date? moment(message.date).format('YYYY-MM-DD HH:mm') : 'No date';
    }
  },
  mounted() {
    this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight + this.$refs.chat.offsetHeight;
  },
  updated() {
    this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight + this.$refs.chat.offsetHeight;
  }
};
</script>

<style lang='scss'>
.plan-messages {
  height: 300px;
  overflow-y: scroll;
}

.message-banner {
  width: 40%;
  .v-banner__wrapper {
    border: none !important;
  }
}
</style>