<template>
  <v-app class="app mt-10">
    <notifications group="main" />
    <nav-bar @toggle="onToggle" />

    <side-bar v-model="showSideBar" />

    <v-main id="main">
      <Loader v-if="!loaded" />

      <router-view v-if="loaded"></router-view>
    </v-main>

    <confirm-dialog
      v-if="signedIn"
      :dialog="showSignOut"
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
import {
  PushNotifications,
} from '@capacitor/push-notifications';

export default {
  name: 'App',
  components: { ConfirmDialog, Loader, SideBar, NavBar },
  data() {
    return {
      loaded: false,
      socket: null,
      showSideBar: true,
      publicRoutes: ['home', 'sign-in', 'sign-up', 'plans'],
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    ...mapGetters(['signedIn']),
    isPublicRoute() {
      const { name } = this.$route;
      return name && this.publicRoutes.includes(name);
    },
    showSignOut() {
      return this.$route.name === 'sign-out';
    },
  },
  methods: {
    ...mapActions([
      'checkAuth',
      'signOut',
      'newSocket',
      'updatePlanLocal',
      'addMessage',
      'newFriendRequest',
      'newPlanInvite',
      'setFirebaseToken'
    ]),
    onToggle() {
      this.showSideBar = !this.showSideBar;
    },
    onCancelSignOut() {
      this.$router.go(-1);
    },
    onSignOut() {
      this.signOut();
      this.$router.replace({ name: 'home' });
    },
    async initSocket() {
      // Set the socket, check if it exists.
      this.socket = await this.newSocket();
      if (!this.socket) {
        return;
      }

      // Set socket event listeners;
      this.socket.on('plan-message', ({ id, message }) => {
        this.addMessage({ id, message });
      });
      this.socket.on('plan-update', ({ id, plan }) => {
        this.updatePlanLocal({ id, plan });
      });
      this.socket.on('friend-request', (request) => {
        this.newFriendRequest({ request });
      });
      this.socket.on('plan-invite', (invite) => {
        this.newPlanInvite({ invite });
      });
    },
    initPushNotifications() {
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token) => {
          console.log('Push registration success, token: ' + token.value);
          this.setFirebaseToken({token: token.value})
        }
      );

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error) => {
          console.log('Error on registration: ' + JSON.stringify(error));
        }
      );

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification) => {
          console.log('Push received: ' + JSON.stringify(notification));
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification) => {
          console.log('Push action performed: ' + JSON.stringify(notification));
        }
      );
    },
    async init() {
      document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
      await this.checkAuth();
      const { signedIn, isPublicRoute, user, socket } = this;

      // Users can not access a private route unless signed in.
      if (!signedIn && !isPublicRoute) {
        await this.$router.replace({ name: 'sign-in-banner' });
      }
      // Socket only works when signed in.
      if (user && socket === null) {
        await this.initSocket();
      }

      this.initPushNotifications();

      this.loaded = true;
    },
  },
  mounted() {
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
  },
};
</script>

<style lang="scss">
body,
header,
nav,
main {
  margin: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left) !important;
}

.v-application {
  height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  overflow: hidden;
}

.v-application--wrap {
  max-height: 100%;
  overflow-y: scroll;
}

.v-progress-circular > svg {
  width: 100px !important;
  height: 100px !important;
}
</style>
