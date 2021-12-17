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
    <v-alert icon="mdi-account" prominent text type="info">
      Don't have an account?<v-btn plain small to="/sign-up" color="primary"
        >Sign up</v-btn
      >
    </v-alert>

    <v-btn color="info" class="mr-4 mt-10" @click="onSignIn"> Sign in </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'SignIn',
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
