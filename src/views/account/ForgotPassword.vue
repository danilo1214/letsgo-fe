<template>
  <v-form @submit.prevent="onSend" class="pa-10 forgot-password-form">
    <template v-if="step === 1">
      <h1>Forgot your password?</h1>
      <p class="mt-4">
        We will send you a unique code to verify your email address
      </p>
      <v-text-field
        v-model="email"
        class="mt-10"
        rounded
        dense
        filled
        placeholder="Email"
      ></v-text-field>
      <Button
        :disabled="loading"
        class="mx-auto"
        rounded
        label="Send"
        @click="onSend"
      />
    </template>
    <template v-else>
      <h1>Enter code</h1>
      <p class="mt-4">A code has been sent to {{ email }}</p>
      <v-otp-input
        class="mt-10"
        hide-spin-buttons
        v-model="otp"
        :disabled="loading"
        @finish="onFinish"
      ></v-otp-input>
    </template>
  </v-form>
</template>

<script>
import Button from '../../components/generic/Button';
import { mapActions } from 'vuex';
import { getError } from '../../helpers/requests';
export default {
  name: 'PasswordChange',
  components: { Button },
  data() {
    return {
      loading: false,
      step: 1,
      email: '',
      otp: '',
    };
  },
  methods: {
    ...mapActions(['otpLogin', 'forgotPassword']),
    onFinish() {
      this.loading = true;
      this.otpLogin({
        email: this.email,
        otp: this.otp,
      })
        .then(() => {
          this.loading = false;
          this.$router.push('/');
        })
        .catch((err) => {
          this.$notify({
            group: 'main',
            title: 'Failed to sign in',
            text: getError(err),
            type: 'error',
          });
          this.loading = false;
        });
    },
    onSend() {
      this.loading = true;
      this.forgotPassword({
        email: this.email,
      })
        .then(() => {
          this.step = 2;
          this.loading = false;
        })
        .catch((err) => {
          this.$notify({
            group: 'main',
            title: 'Failed',
            text: getError(err),
            type: 'error',
          });
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.forgot-password-form {
  width: 350px;
  margin: 100px auto;
}
</style>
