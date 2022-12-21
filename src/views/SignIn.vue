<template>
  <v-form
    @submit.prevent="onSignIn"
    class="sign-in-form mx-auto mt-15"
    ref="form"
    lazy-validation
  >
    <v-text-field
      rounded
      filled
      @keydown.enter.prevent="onSignIn"
      v-model="email"
      placeholder="Email"
      type="email"
      required
    ></v-text-field>
    <v-text-field
      class="mb-0 pb-0 password-input"
      @keydown.enter.prevent="onSignIn"
      v-model="password"
      placeholder="Password"
      type="password"
      rounded
      filled
      required
    ></v-text-field>
    <Button
      rounded
      label="Forgot your password?"
      text
      class="mt-0"
      to="/forgot-password"
    />

    <v-alert type="error" v-if="error">
      {{ error }}
    </v-alert>

    <Button
      rounded
      class="mx-auto mt-10 d-block width100"
      icon-left="mdi-import"
      label="Sign in"
      :disabled="isLoading"
      type="submit"
    />

    <v-alert class="mt-16 pa-4" rounded dark text type="info">
      Not registered yet?
      <Button
        class="ml-2"
        color="info"
        rounded
        small
        to="/sign-up"
        label="Sign Up"
        light
      />
    </v-alert>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

import Button from '@/components/generic/Button';
import { getError } from '@/helpers/requests';

export default {
  name: 'SignIn',
  components: { Button },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(['signIn']),
    async onSignIn() {
      const { email, password } = this;
      this.isLoading = true;

      this.signIn({ email, password })
        .then(() => {
          this.$router.replace({ name: 'home' });
          this.isLoading = false;
        })
        .catch((err) => {
          this.error = getError(err);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.sign-in-form {
  max-width: 300px;
}

.password-input {
  height: 60px;
}

a {
  text-decoration: none;
}
</style>
