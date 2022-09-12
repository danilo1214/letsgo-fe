<template>
  <v-dialog
    persistent
    value="true"
    transition="dialog-top-transition"
    max-width="600"
  >
    <v-card>
      <v-toolbar color="info darken-1" dark>
        <v-icon class="mr-5">mdi-account-multiple-plus</v-icon>Invite friends to plan
      </v-toolbar>
      <v-card-text>
        <div class="body-1 pa-12">HERE SELECT</div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <Button color="secondary" text @click="goBack" label="Go back" />
        <Button color='info' text @click="onSend" label="Send" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Button from '@/components/generic/Button';
export default {
  name: 'AddFriendsModal',
  components: { Button },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSend() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
