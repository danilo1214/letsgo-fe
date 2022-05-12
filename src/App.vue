<template>
  <v-app>
    <notifications group="main" />
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
import ConfirmDialog from './components/generic/ConfirmDialog';

export default {
  name: 'App',
  components: { ConfirmDialog, Loader, SideBar, NavBar },
  data() {
    return {
      loaded: false,
      socket: null,
      showSideBar: true,
      showSignOut: false,
      publicRoutes: ['home', 'sign-in', 'sign-up', 'plans'],
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    ...mapGetters(['signedIn']),
    isPublicRoute() {
      const { name } = this.$route;
      return name ? this.publicRoutes.includes(name) : false;
    },
  },
  methods: {
    ...mapActions(['checkAuth', 'signOut', 'newSocket', 'updatePlanLocal', 'addMessage']),
    onToggle() {
      this.showSideBar = !this.showSideBar;
    },
    onCancelSignOut() {
      this.showSignOut = false;
      this.$router.go(-1);
    },
    onSignOut() {
      this.signOut();
      this.showSignOut = false;
      this.$router.replace({ name: 'home' });
    },
    async initSocket() {
      console.log(this.user);
      this.socket = await this.newSocket();
      this.socket.on('plan-message', ({ id, message }) => {
        this.addMessage({ id, message });
      });
      this.socket.on('plan-update', ({ id, plan }) => {
        this.updatePlanLocal({id, plan})
      });
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

      if(this.user && this.socket === null) {
        await this.initSocket();
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
  beforeDestroy() {
    this.socket.disconnect();
    this.socket = null;
  }
};
</script>

<style>
.v-progress-circular > svg {
  width: 100px !important;
  height: 100px !important;
}
</style>
