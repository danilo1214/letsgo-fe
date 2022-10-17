<template>
  <v-form class="ma-10" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="user.first_name"
      :rules="required('First name')"
      label="First Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.last_name"
      :rules="required('Last name')"
      label="Last Name"
      required
    ></v-text-field>

    <v-radio-group
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
          label="Birthday"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="user.birth_date"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="setDate"
      ></v-date-picker>
    </v-menu>

    <Select :rules="required('Country')" v-model='user.country' :items='countries' label='Country' />

    <v-text-field
      v-model="user.email"
      :rules="rules.emailRules"
      type="email"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.password"
      :rules="required('Password')"
      label="Password"
      type="password"
      required
    ></v-text-field>


    <v-alert type="error" v-if="error">
      {{ error }}
    </v-alert>
    <Button
      :disabled="!valid"
      class="mr-4 mt-10"
      @click="onSubmit"
      icon-left="mdi-account-plus-outline"
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

export default {
  name: 'SignUp',
  components: { Select, Button },
  data() {
    return {
      error: '',
      valid: false,
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
      countries: country.names(),
    };
  },
  methods: {
    ...mapActions(['signUp']),
    setDate(date) {
      this.$refs.menu.save(date);
    },
    required(field) {
      return [(v) => !!v || `${field} is required`];
    },
    onSubmit() {
      const valid = this.$refs.form.validate();
      if (!valid) {
        return;
      }

      const { user } = this;
      this.signUp({ user })
        .then(() => {
          this.$router.replace({ name: 'home' });
          this.$notify({
            group: 'main',
            title: 'Signed up',
            text: 'You have successfully signed up to Letsgo',
            type: 'success',
          });
        })
        .catch((err) => {
          this.error = getError(err);
        });
    },
  },
};
</script>

<style scoped></style>
