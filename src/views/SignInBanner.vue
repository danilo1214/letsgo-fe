<template>
  <v-dialog
    persistent
    value="true"
    transition="dialog-top-transition"
    max-width="600"
  >
    <v-card>
      <v-toolbar color="warning" dark
        ><v-icon class="mr-5">mdi-account-plus</v-icon>You are not signed in
      </v-toolbar>
      <v-card-text>
        <div class="body-1 pa-12">Sign in to fully use Letsgo</div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <Button color="secondary" text @click="goBack" label="Go Back" />
        <Button text @click="onSignIn" label="Sign in" />
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
