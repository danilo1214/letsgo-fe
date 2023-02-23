<template>
  <v-form @submit.prevent="onSendVerifyMail" class="pa-10">
    <v-img
      width="100"
      height="100"
      class="ma-auto mt-16"
      src="../../../public/assets/mail.png"
      alt="logo"
    />
    <h1 class="text-center mt-8">Verify your email address</h1>
    <div class="body-1 text-center mt-3">
      A mail has been sent to verify your email address.
    </div>
    <v-text-field
      class="mt-16"
      rounded
      filled
      @keydown.enter.prevent="onSendVerifyMail"
      v-model="email"
      placeholder="Didn't recieve a mail?"
      type="email"
      required
    ></v-text-field>

    <v-alert v-if="isLoading" type="accent" rounded
      >You can try again in 5s</v-alert
    >

    <Button
      rounded
      class="mx-auto mt-2 d-block width100"
      icon-left="mdi-mail"
      label="Send again"
      :disabled="isLoading"
      type="submit"
    />
  </v-form>
</template>

<script>
import Button from '../../components/generic/Button';
import { mapActions } from 'vuex';
import { getError } from '../../helpers/requests';
export default {
  name: 'VerifyMail',
  components: { Button },
  data() {
    return {
      isLoading: false,
      email: '',
    };
  },
  methods: {
    ...mapActions(['resendVerify']),
    onSendVerifyMail() {
      this.isLoading = true;

      this.resendVerify({ email: this.email })
        .then(() => {
          this.$notify({
            group: 'main',
            title: 'Success',
            text: 'Successfully sent verification mail',
            type: 'success',
          });
        })
        .catch((err) => {
          this.$notify({
            group: 'main',
            title: 'Failed',
            text: getError(err),
            type: 'error',
          });
        });

      setTimeout(() => {
        this.isLoading = false;
      }, 1000 * 5);
    },
  },
};
</script>

<style scoped></style>
