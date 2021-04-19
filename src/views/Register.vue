<template>
  <v-form
      class="ma-10"
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-text-field
        v-model="user.firstName"
        :rules="required('First name')"
        label="First Name"
        required
    ></v-text-field>

    <v-text-field
        v-model="user.lastName"
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
    <br/>




    <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="onSubmit"
    >
      Submit
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      valid: false,
      sexes: ["Male", "Female"],
      user: {
        firstName: "",
        lastName: "",
        photo_url: "",
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
    setDate(date) {
      this.$refs.menu.save(date);
    },
    required(field){
      return [v=> !!v || `${field} is required`];
    },
    onSubmit(){
      const valid = this.$refs.form.validate();

      if(!valid){
        return;
      }
      console.log("submittt");
    }
  }
}
</script>

<style scoped>

</style>
