<template>
  <v-badge :color="verifiedColor" avatar bottom bordered overlap>
    <template v-slot:badge>
      <v-avatar>
        <v-icon v-if="isVerified">mdi-checkbox-marked-circle</v-icon>
        <v-icon v-else>mdi-alert-circle</v-icon>
      </v-avatar>
    </template>

    <v-avatar :size="size">
      <Tooltip :text="verifiedText" :color="verifiedColor">
        <v-img
          :src="photo"
          slot-scope="{ activator }"
          v-on="activator.on"
          v-bind="activator.attrs"
        />
      </Tooltip>
    </v-avatar>
  </v-badge>
</template>

<script>
import Tooltip from '@/components/generic/Tooltip';

export default {
  components: { Tooltip },
  props: {
    user: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 40,
    },
  },
  name: 'Avatar',
  computed: {
    isVerified() {
      const { user } = this;
      return user.email_verified && user.photo_verified;
    },
    verifiedColor() {
      return this.isVerified ? 'primary' : 'error';
    },
    verifiedText() {
      return this.isVerified ? 'Account verified' : 'Account not verified';
    },
    photo() {
      return this.user.photo_url || '../../../assets/default-profile.png';
    },
  },
};
</script>

<style>
span.v-badge__badge.error {
  inset: 75% auto auto 75% !important;
}

span.v-badge__badge.primary {
  inset: 75% auto auto 75% !important;
}
</style>
