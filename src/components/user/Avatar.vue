<template>
  <v-badge :color="verifiedColor" avatar bottom bordered overlap>
    <template v-slot:badge>
      <v-avatar>
        <v-icon v-if="isVerified">mdi-checkbox-marked-circle </v-icon>
        <v-icon v-else>mdi-alert-circle</v-icon>
      </v-avatar>
    </template>

    <v-avatar size="40">
      <Tooltip :text="verifiedText" :color="verifiedColor">
        <v-img
          :src="user.photo_url"
          slot-scope="{ activator }"
          v-on="activator.on"
          v-bind="activator.attrs"
        />
      </Tooltip>
    </v-avatar>
  </v-badge>
</template>

<script>
import Tooltip from '../generic/Tooltip';

export default {
  components: { Tooltip },
  props: {
    user: {
      type: Object,
      required: true,
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
  },
};
</script>

<style scoped></style>
