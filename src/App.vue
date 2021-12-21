<template>
  <v-app>
    <nav-bar @toggle="onToggle" />

    <side-bar v-model="showSideBar" />

    <v-main>
      <Loader v-if="!loaded" />

      <router-view v-if="loaded"></router-view>
    </v-main>

    <confirm-dialog
      v-if="signedIn"
      :dialog="showSignOut"
      entity="user"
      name-key="email"
      icon="mdi-export"
      action="sign out"
      :data="user"
      @ok="onSignOut"
      @cancel="onCancelSignOut"
    ></confirm-dialog>
  </v-app>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import SideBar from '@/components/navbar/SideBar';
import NavBar from '@/components/navbar/NavBar';
import Loader from './components/generic/Loader';
import ConfirmDialog from "./components/generic/ConfirmDialog";

export default {
  name: 'App',
  components: { ConfirmDialog, Loader, SideBar, NavBar },
  data() {
    return {
      loaded: false,
      showSideBar: true,
      showSignOut: false,
      publicRoutes: ['home', 'sign-in', 'sign-up', 'plans'],
    };
  },
  computed: {
    ...mapState(['user']),
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
    onCancelSignOut() {
      this.showSignOut = false;
      this.$router.go(-1);
    },
    onSignOut() {
      this.signOut();
      this.$router.replace({ name: 'home' });
    },
    async init() {
      await this.checkAuth();
      const { signedIn, isPublicRoute, $route } = this;

      if (!signedIn && !isPublicRoute) {
        await this.$router.replace({ name: 'sign-in-banner' });
      }

      if ($route.name === 'sign-out') {
        this.showSignOut = true;
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
.v-progress-circular > svg {
  width: 100px !important;
  height: 100px !important;
}
</style>
