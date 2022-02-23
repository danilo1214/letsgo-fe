<template>
  <user-card class="mt-8" :user="user">
    <v-card-actions>
      <Button label="Accept" color="success" icon-left="mdi-check" />
      <Button label="Decline" color="error" icon-left="mdi-cancel" text />
    </v-card-actions>
  </user-card>
</template>

<script>
import UserCard from './UserCard';
import Button from '../generic/Button';
export default {
  name: 'Request',
  components: { Button, UserCard },
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style scoped></style>
