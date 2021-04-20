<template>
  <v-form
      class="ma-10"
      ref="form"
      v-model="valid"
      lazy-validation
  >
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

    <v-radio-group  label="Sex" v-model="user.sex" :rules="required('Sex')" required>
      <v-radio
          v-for="(sex,key) in sexes"
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

    <v-text-field
        v-model="user.email"
        :rules="rules.emailRules"
        label="E-mail"
        required
    ></v-text-field>

    <v-text-field
        v-model="user.password"
        :rules="required('Password')"
        label="Password"
        required
    ></v-text-field>

    <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="onSubmit"
    >
      Submit
    </v-btn>

    <v-alert class="mt-15" type="error" v-if="error">
      {{error}}
    </v-alert>
  </v-form>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Register",
  data() {
    return {
      error: "",
      valid: false,
      sexes: ["Male", "Female"],
      user: {
        first_name: "",
        last_name: "",
        photo_url: "...",
        sex: "Male",
        birth_date: "",
        email: "",
        password: ""
      },
      rules: {
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

      }
    }
  },
  methods: {
    ...mapActions(["register"]),
    setDate(date) {
      this.$refs.menu.save(date);
    },
    required(field){
      return [v=> !!v || `${field} is required`];
    },
    onSubmit(){
      const valid = this.$refs.form.validate();
      const {user} = this;

      if(!valid){
        return;
      }

      this.register({user}).then(()=>{
        this.$router.replace({name: "home"});
      }).catch(err=>{
        this.error = err.response.data.error;
      });

    }
  }
}
</script>

<style scoped>

</style>
