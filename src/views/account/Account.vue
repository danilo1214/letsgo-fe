<template>
  <div class="pa-10">
    <UserCard :user="user">
      <template v-slot:menu>
        <v-list-item>
          <Button text color="error" label="Delete" icon-left="mdi-trash-can" />
        </v-list-item>
        <v-list-item>
          <Button
            to="/password-change"
            text
            color="info"
            label="Change password"
            icon-left="mdi-key"
          />
        </v-list-item>
      </template>
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
