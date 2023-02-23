<template>
  <v-form class="ma-10" ref="form" v-model="valid" lazy-validation>
    <v-img
      width="100"
      height="100"
      class="ma-auto"
      src="../../public/assets/logo.png"
      alt="logo"
    />
    <v-text-field
      class="mt-10"
      v-model="user.first_name"
      :rules="required('First name')"
      placeholder="First Name"
      rounded
      filled
      required
    ></v-text-field>

    <v-text-field
      v-model="user.last_name"
      :rules="required('Last name')"
      placeholder="Last Name"
      rounded
      filled
      required
    ></v-text-field>

    <v-radio-group
      class="mt-0 ml-2"
      label="Sex"
      v-model="user.sex"
      :rules="required('Sex')"
      required
    >
      <v-radio
        v-for="(sex, key) in sexes"
        :key="key"
        :label="sex"
        :value="sex"
      ></v-radio>
    </v-radio-group>

    <v-menu
      v-model="menu"
      ref="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          required
          :rules="required('Birthday')"
          v-model="user.birth_date"
          placeholder="Birthday"
          prepend-inner-icon="mdi-calendar"
          readonly
          rounded
          filled
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        :active-picker.sync="activePicker"
        v-model="user.birth_date"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="setDate"
      ></v-date-picker>
    </v-menu>

    <Select
      rounded
      filled
      :rules="required('Country')"
      v-model="user.country"
      :items="countries"
      placeholder="Country"
    />

    <v-text-field
      v-model="user.email"
      :rules="rules.emailRules"
      type="email"
      rounded
      filled
      placeholder="E-mail"
      required
    ></v-text-field>

    <password-input
      v-model="user.password"
      :rules="required('Password')"
      label="Password"
      type="password"
      rounded
      filled
      required
    ></password-input>

    <v-alert type="error" v-if="error">
      {{ error }}
    </v-alert>

    <v-alert type="warning" color="warning">
      By creating an account you agree to the
      <a href="https://letsgo-social.com/assets/terms-and-conditions.html"
        >terms and conditions of LetsGo</a
      >
    </v-alert>
    <Button
      :disabled="!valid || isLoading"
      class="mr-4 mt-10"
      rounded
      @click="onSubmit"
      icon-left="mdi-account-plus"
      label="Sign Up"
    />
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
import Button from '@/components/generic/Button';
import { getError } from '@/helpers/requests';
import country from 'country-list-js';
import Select from '../components/generic/Select';
import PasswordInput from '../components/generic/PasswordInput';

export default {
  name: 'SignUp',
  components: { PasswordInput, Select, Button },
  data() {
    return {
      c: country,
      activePicker: 'YEAR',
      error: '',
      menu: false,
      valid: false,
      isLoading: false,
      sexes: ['Male', 'Female'],
      user: {
        first_name: '',
        last_name: '',
        sex: 'Male',
        birth_date: '',
        email: '',
        password: '',
        country: '',
      },
      rules: {
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      },
      countries: country.names().sort(),
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'));
    },
  },

  methods: {
    ...mapActions(['signUp']),
    setDate(date) {
      this.$refs.menu.save(date);
      setTimeout(() => (this.activePicker = 'YEAR'));
    },
    required(field) {
      return [(v) => !!v || `${field} is required`];
    },
    onSubmit() {
      const valid = this.$refs.form.validate();
      if (!valid) {
        return;
      }

      this.isLoading = true;

      const { user } = this;
      this.signUp({ user })
        .then(() => {
          this.$router.replace({ name: 'verify-mail' });
          this.$notify({
            group: 'main',
            title: 'Signed up',
            text: 'You have successfully signed up to Letsgo',
            type: 'success',
          });
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
a {
  text-decoration: none;
}
</style>
