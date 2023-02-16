<template>
  <v-banner two-line class="body-2">
    <v-avatar slot="icon" color="error" size="30">
      <v-icon icon="mdi-lock" color="white"> mdi-alert-circle </v-icon>
    </v-avatar>

    Finish verifying your account to use all of Letsgo's services, such as
    making and attending plans.

    <template v-slot:actions>
      <Button
        text
        rounded
        color="primary"
        @click="$emit('verify')"
        label="Verify"
      />
    </template>
  </v-banner>
</template>

<script>
import Button from '../generic/Button';
export default {
  name: 'VerifyBanner',
  components: { Button },
};
</script>

<style scoped></style>
