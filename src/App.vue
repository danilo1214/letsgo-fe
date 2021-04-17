<template>
  <v-app>
    <nav-bar v-if="loggedIn"/>


    <v-app-bar app>
      <!-- -->
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import NavBar from "@/components/NavBar";
export default {
  name: "App",
  components: {NavBar},
  data(){
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters(["loggedIn"])
  },
  methods: {
    ...mapActions(["checkAuth"]),
    async init(){
     await this.checkAuth();
     const {loggedIn} = this;
     console.log(loggedIn);
     if(!loggedIn){
       await this.$router.replace({name: "login-banner"});
     }
     this.loaded = true;
    }
  },
  created(){
    this.init();
  }
}
</script>

