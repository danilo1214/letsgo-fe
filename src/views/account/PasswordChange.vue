<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="onChange"
    class="pa-10 forgot-password-form"
  >
    <h1>Change your password</h1>
    <password-input
      :rules="[required]"
      type="password"
      v-model="password"
      class="mt-10"
      rounded
      dense
      filled
      @change="$refs.form.validate()"
      placeholder="New password"
    ></password-input>
    <password-input
      :rules="[required, matchingPasswords]"
      type="password"
      @change="$refs.form.validate()"
      v-model="confirmPassword"
      class="mt-10"
      rounded
      dense
      filled
      placeholder="Enter again"
    ></password-input>
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
import PasswordInput from '../../components/generic/PasswordInput';
export default {
  name: 'PasswordChange',
  components: { PasswordInput, Button },
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
