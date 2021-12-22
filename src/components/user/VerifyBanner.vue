<template>
  <v-banner two-line>
    <v-avatar slot="icon" color="primary darken-1" size="40">
      <v-icon icon="mdi-lock" color="white">
        mdi-checkbox-marked-circle
      </v-icon>
    </v-avatar>

    Finish verifying your account to use all of Letsgo's services, such as
    making and attending plans.

    <template v-slot:actions>
      <v-btn text color="primary" @click="$emit('verify')"> Verify </v-btn>
    </template>
  </v-banner>
</template>

<script>
export default {
  name: 'VerifyBanner',
};
</script>

<style scoped></style>
