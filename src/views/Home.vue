<template>
  <v-container fluid class='flex flex-column'>
    <landing v-if="!user" />
    <welcome v-else> signed in</welcome>

    <v-spacer></v-spacer>

    <v-footer
      inset
      dark
      padless
    >
      <v-card
        flat
        tile
        class="primary lighten-1 white--text text-center footer"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            class="mx-4 white--text"
            :href='icon.link'
            icon
          >
            <v-icon size="24px">
              {{ icon.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          © 2023 letsgo-social.com - All Rights Reserved.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-container>
</template>

<script>
import Landing from './Landing';
import { mapState } from 'vuex';
import Welcome from './Welcome';
export default {
  name: 'HelloWorld',
  components: { Welcome, Landing },
  data() {
    return {
      icons: [
        {
          link: "https://facebook.com",
          icon: "mdi-facebook"
        },
        {
          link: "https://twitter.com",
          icon: "mdi-twitter"
        },
        {
          link: "https://linkedin.com",
          icon: "mdi-linkedin"
        },
        {
          link: "https://instagram.com/letsgo.apps",
          icon: "mdi-instagram"
        }
      ]
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
  },
};
</script>

<style>
.footer {
  width: 100%;
}
</style>
