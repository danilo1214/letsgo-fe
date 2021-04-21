<template>
  <v-app>
    <nav-bar />

    <side-bar v-if="loggedIn"/>



    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
export default {
  name: "App",
  components: { SideBar, NavBar},
  data(){
    return {
      loaded: false,
      publicRoutes: ["home", "login", "register"]
    }
  },
  computed: {
    ...mapGetters(["loggedIn"]),
    isPublicRoute(){
      const {name} = this.$route;
      return this.publicRoutes.includes(name);
    }
  },
  methods: {
    ...mapActions(["checkAuth"]),
    async init(){
     await this.checkAuth();
     const {loggedIn, isPublicRoute} = this;

     if(!loggedIn && !isPublicRoute){
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

