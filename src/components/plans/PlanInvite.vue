<template>
  <v-banner class="mt-5" two-line>
    <avatar class="mr-2 mt-5 mb-3" :user="invite.user" :size="40"></avatar>
    {{ invite.user.first_name }} has invited you to join
    <router-link :to="`/plan/${invite.plan._id}`">{{
      invite.plan.caption
    }}</router-link>
    <template v-slot:actions>
      <Button
        rounded
        label="Decline"
        color="info"
        icon-left="mdi-cancel"
        text
        @click="$emit('decline', invite.plan._id)"
      />
      <Button
        rounded
        label="Accept"
        color="success"
        icon-left="mdi-check"
        @click="$emit('accept', invite.plan._id)"
      />
    </template>
  </v-banner>
</template>

<script>
import Avatar from '../user/Avatar';
import Button from '../generic/Button';
export default {
  name: 'PlanInvite',
  components: { Button, Avatar },
  props: {
    invite: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
a {
  color: #6475e0;
  text-decoration: none;
}
</style>
