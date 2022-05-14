<template>
  <v-container fluid>
    <landing v-if='!user'/>
    <div v-else> signed in</div>
  </v-container>
</template>

<script>
import Landing from './Landing';
import { mapState } from 'vuex';
export default {
  name: 'HelloWorld',
  components: { Landing },
  data() {
    return {};
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
  }
};
</script>
