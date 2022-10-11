<template>
  <user-card
    :show-thumb="false"
    class="mt-8"
    :user="user"
    @add-friend="(user) => $emit('add-friend', user)"
  >
    <v-card-actions>
      <Button
        rounded
        label="Decline"
        color="error"
        icon-left="mdi-cancel"
        text
        @click="$emit('decline', user._id)"
      />
      <Button
        rounded
        label="Accept"
        color="success"
        icon-left="mdi-check"
        @click="$emit('accept', user._id)"
      />
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
