<template>
  <div class="pa-10">
    <UserCard :user="user">
      <template v-slot:menu>
        <v-list-item>
          <Button
            rounded
            text
            color="error"
            label="Delete"
            icon-left="mdi-trash-can"
            @click="onDeleteAccount"
          />
        </v-list-item>
        <v-list-item>
          <Button
            rounded
            to="/password-change"
            text
            color="info"
            label="Change password"
            icon-left="mdi-key"
          />
        </v-list-item>
      </template>
    </UserCard>
    <VerifyBanner class="mx-auto mt-15" v-if="!isVerified" @verify="onVerify" />
    <confirm-dialog
      :dialog="showDelete"
      icon="mdi-trash-can"
      action="Delete"
      color='error'
      name-key="email"
      entity="your account"
      :data="user"
      @ok="onDeleteConfirm"
      @cancel="onDeleteCancel"
    ></confirm-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import VerifyBanner from '@/components/user/VerifyBanner';
import UserCard from '@/components/user/UserCard';
import Button from '@/components/generic/Button';
import ConfirmDialog from '../../components/generic/ConfirmDialog';

export default {
  name: 'Account',
  components: { ConfirmDialog, Button, UserCard, VerifyBanner },
  data() {
    return {
      showDelete: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    isVerified() {
      return this.user.email_verified && this.user.photo_verified;
    },
  },
  methods: {
    ...mapActions(['deleteAccount', 'signOut']),
    onDeleteAccount() {
      this.showDelete = true;
    },
    onDeleteCancel() {
      this.showDelete = false;
    },
    onDeleteConfirm() {
      this.showDelete = false;
      this.deleteAccount().then(() => {
        this.signOut();
        this.$router.push('/');
      });
    },
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
