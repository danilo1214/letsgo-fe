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
      @keydown.enter.prevent="onSignIn"
      v-model="password"
      placeholder="Password"
      type="password"
      rounded
      filled
      required
    ></v-text-field>

    <v-alert type="error" v-if="error">
      {{ error }}
    </v-alert>

    <v-alert rounded dark text type="info">
      Don't have an account?
      <v-spacer></v-spacer>
      <Button color="info" rounded small to="/sign-up" label="Sign Up" light />
    </v-alert>

    <Button
      rounded
      class="mx-auto mt-10"
      icon-left="mdi-import"
      label="Sign in"
      :disabled="isLoading"
      type="submit"
    />
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
</style>
