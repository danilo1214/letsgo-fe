<template>
  <v-app>
    <nav-bar @toggle="onToggle" />

    <side-bar v-if="signedIn" v-model="showSideBar" />

    <v-main>
      <v-progress-circular
        class="spinner-main"
        v-if="!loaded"
        indeterminate
        color="primary"
      />

      <router-view v-if="loaded"></router-view>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import SideBar from '@/components/navbar/SideBar';
import NavBar from '@/components/navbar/NavBar';
export default {
  name: 'App',
  components: { SideBar, NavBar },
  data() {
    return {
      loaded: false,
      showSideBar: true,
      publicRoutes: ['home', 'sign-in', 'sign-up', 'plans'],
    };
  },
  computed: {
    ...mapGetters(['signedIn']),
    isPublicRoute() {
      const { name } = this.$route;
      return name ? this.publicRoutes.includes(name) : false;
    },
  },
  methods: {
    ...mapActions(['checkAuth', 'signOut']),
    onToggle() {
      this.showSideBar = !this.showSideBar;
    },
    async init() {
      await this.checkAuth();
      const { signedIn, isPublicRoute, $route } = this;

      if (!signedIn && !isPublicRoute) {
        await this.$router.replace({ name: 'sign-in-banner' });
      }

      if ($route.name === 'sign-out') {
        this.signOut();
        this.$router.replace({ name: 'home' });
      }

      this.loaded = true;
    },
  },
  created() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    },
  },
};
</script>

<style>
.spinner-main {
  width: 100px !important;
  height: 100px !important;
  margin: 200px auto;
  display: block;
}
</style>
