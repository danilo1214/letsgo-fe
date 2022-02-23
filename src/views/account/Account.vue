<template>
  <div class="pa-10">
    <UserCard :user="user">
      <Button color="error" label="Delete" icon-left="mdi-trash-can" />
    </UserCard>
    <VerifyBanner class="mx-auto mt-10" v-if="!isVerified" @verify="onVerify" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VerifyBanner from '@/components/user/VerifyBanner';
import UserCard from '@/components/user/UserCard';
import Button from '@/components/generic/Button';

export default {
  name: 'Account',
  components: { Button, UserCard, VerifyBanner },
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
