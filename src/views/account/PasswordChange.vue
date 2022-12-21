<template>
  <v-form ref='form' v-model="valid" @submit.prevent="onChange" class="pa-10 forgot-password-form">
    <h1>Change your password</h1>
    <v-text-field
      :rules="[required]"
      type="password"
      v-model="password"
      class="mt-10"
      rounded
      dense
      filled
      @change='$refs.form.validate()'
      placeholder="New password"
    ></v-text-field>
    <v-text-field
      :rules="[required, matchingPasswords]"
      type="password"
      @change='$refs.form.validate()'
      v-model="confirmPassword"
      class="mt-10"
      rounded
      dense
      filled
      placeholder="Enter again"
    ></v-text-field>
    <Button
      :disabled="loading || !valid"
      class="mx-auto"
      rounded
      label="Change"
      @click="onChange"
    />
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
      valid: false,
      password: '',
      confirmPassword: '',
      loading: false,
    };
  },
  methods: {
    ...mapActions(['passwordChange']),
    required(field) {
      return [(v) => !!v || `${field} is required`];
    },
    matchingPasswords() {
      if (this.password === this.confirmPassword) {
        return true;
      }

      return 'Passwords does not match.';
    },
    onChange() {
      const valid = this.$refs.form.validate();
      if (!valid) {
        return;
      }

      this.loading = true;

      this.passwordChange({ password: this.password })
        .then(() => {
          this.$notify({
            group: 'main',
            title: 'Success',
            text: 'Successfully changed password',
            type: 'success',
          });
          this.loading = false;
          this.$router.replace({ name: 'account' });
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

<style scoped></style>
