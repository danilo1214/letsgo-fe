<template>
  <v-banner class="mt-5" two-line>
    <avatar class="pa-5" :user="invite.user" :size="60"></avatar>
    {{ invite.user.first_name }} {{ invite.user.last_name }} has invited you to
    join
    <Button
      :label="invite.plan.caption"
      text
      :to="`/plan/${invite.plan._id}`"
    />
    <template v-slot:actions>
      <Button
        label="Decline"
        color="info"
        icon-left="mdi-cancel"
        text
        @click="$emit('decline', invite.plan._id)"
      />
      <Button
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

<style scoped></style>
