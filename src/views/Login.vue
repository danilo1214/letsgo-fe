<template>
  <v-form

      class="ma-10 w-200"
      ref="form"
      lazy-validation
  >
    <v-text-field
        v-model="email"
        label="Email"
        required
    ></v-text-field>

    <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
    ></v-text-field>
    <v-alert type="error" v-if="error">
      {{error}}
    </v-alert>
    <v-alert
        icon="mdi-account"
        prominent
        text
        type="info"
    >
      Don't have an account? Sign up  <router-link to="/register" color="primary">here</router-link>
    </v-alert>

    <v-btn
        color="info"
        class="mr-4 mt-10"
        @click="onLogin"
    >
      Sign in
    </v-btn>




  </v-form>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "Login",
  data(){
    return {
      email: "",
      password: "",
      error: ""
    }
  },
  methods: {
    ...mapActions(["login"]),
    async onLogin() {
      const {email, password} = this;
      this.login({email, password}).then(()=>{
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
