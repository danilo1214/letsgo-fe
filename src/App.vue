<template>
  <v-app>
    <nav-bar />

    <side-bar v-if="signedIn"/>



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
      publicRoutes: ["home", "sign-in", "sign-up", "plans"]
    }
  },
  computed: {
    ...mapGetters(["signedIn"]),
    isPublicRoute(){
      const {name} = this.$route;
      return name? this.publicRoutes.includes(name): false;
    }
  },
  methods: {
    ...mapActions(["checkAuth", "signOut"]),
    async init(){
     await this.checkAuth();
     const {signedIn, isPublicRoute, $route} = this;

     if(!signedIn && !isPublicRoute){
       await this.$router.replace({name: "sign-in-banner"});
     }

      if($route.name === 'sign-out'){
        console.log("hi");
        this.signOut();
        this.$router.replace({name: "home"});
      }

     this.loaded = true;
    }
  },
  created(){
    this.init();
  },
  watch: {
    $route(){
      this.init();
    }
  }
}
</script>

