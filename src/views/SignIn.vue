<template>
  <v-form class="ma-10 w-200" ref="form" lazy-validation>
    <v-text-field v-model="email" label="Email" required></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      required
    ></v-text-field>

    <v-alert type="error" v-if="error">
      {{ error }}
    </v-alert>

    <v-alert dark text type="info">
      Don't have an account?<Button plain small to="/sign-up" label="Sign Up" />
    </v-alert>

    <Button
      class="mr-4 mt-10"
      icon-left="mdi-import"
      label="Sign in"
      @click="onSignIn"
    />
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
import Button from '../components/generic/Button';
export default {
  name: 'SignIn',
  components: { Button },
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    ...mapActions(['signIn']),
    async onSignIn() {
      const { email, password } = this;
      this.signIn({ email, password })
        .then(() => {
          this.$router.replace({ name: 'home' });
        })
        .catch((err) => {
          this.error = err.response.data.error;
        });
    },
  },
};
</script>

<style scoped></style>
