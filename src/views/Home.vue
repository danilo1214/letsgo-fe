<template>
  <v-container fluid>
    <landing v-if="!user" />
    <welcome v-else> signed in</welcome>
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
    return {};
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
  },
};
</script>
