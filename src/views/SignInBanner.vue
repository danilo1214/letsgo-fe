<template>
  <v-dialog
    persistent
    value="true"
    transition="dialog-top-transition"
    max-width="600"
  >
    <v-card>
      <v-row class="max-100 pa-10">
        <v-col cols="12" md="5" class="align-center justify-center d-flex">
          <v-avatar slot="icon" color="warning darken-1" size="100">
            <v-icon large icon="mdi-lock" color="white" class="ma-10">
              mdi-account-plus
            </v-icon>
          </v-avatar>
        </v-col>

        <v-col cols="12" md="7">
          <h1 class="text-center">You are not signed in</h1>
          <p class="mt-2 text-center">Sign in to fully use LetsGo</p>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-spacer></v-spacer>
        <Button rounded color="secondary" text @click="goBack" label="Back" />
        <Button
          rounded
          color="warning darken-1"
          text
          @click="onSignIn"
          label="Sign in"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Button from '@/components/generic/Button';
export default {
  name: 'SignInBanner',
  components: { Button },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSignIn() {
      this.$router.replace({ name: 'sign-in' });
    },
  },
};
</script>

<style scoped></style>
