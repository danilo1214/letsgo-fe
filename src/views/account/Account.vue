<template>
  <v-main>
    <v-row>
      <UserCard :user="user" />
    </v-row>

    <v-row>
      <VerifyBanner class="mx-auto" v-if="!isVerified" @verify="onVerify" />
    </v-row>
  </v-main>
</template>

<script>
import { mapState } from 'vuex';
import VerifyBanner from '../../components/user/VerifyBanner';
import UserCard from '../../components/user/UserCard';

export default {
  name: 'Account',
  components: { UserCard, VerifyBanner },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    isVerified() {
      return this.user.email_verified && this.user.photo_verified;
    },
  },
  methods: {
    onVerify() {
      this.$router.push('/verify');
    },
  },
};
</script>

<style scoped>
span.v-badge__badge.error {
  width: 500px;
}
</style>
