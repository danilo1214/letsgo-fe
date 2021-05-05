<template>
  <v-dialog
      persistent
      value="true"
      transition="dialog-top-transition"
      max-width="600"
  >
    <v-card>
      <v-toolbar
          color="blue darken-3"
          dark
      ><v-icon class="mr-5">mdi-account-plus</v-icon>You are not signed in
      </v-toolbar>
      <v-card-text>
        <div class="body-1 pa-12">Sign in to fully use Letsgo</div>
      </v-card-text>


      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            depressed
            color="blue-grey"
            text
            @click="goBack"
        >
          Go Back
        </v-btn>
        <v-btn
            color="blue"
            text
            @click="onSignIn"
        >
          Sign in
        </v-btn>
      </v-card-actions>


    </v-card>
  </v-dialog>


</template>

<script>
export default {
  name: "SignInBanner",
  methods: {
    goBack(){
      this.$router.push(".");
    },
    onSignIn(){
      this.$router.replace({name: "sign-in"});
    }
  }
}
</script>

<style scoped>

</style>
