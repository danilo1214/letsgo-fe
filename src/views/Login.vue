<template>
  <v-form
      class="ma-10"
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


    <v-btn
        color="success"
        class="mr-4"
        @click="onLogin"
    >
      Sign in
    </v-btn>

    <v-alert class="mt-15" type="error" v-if="error">
      {{error}}
    </v-alert>


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
