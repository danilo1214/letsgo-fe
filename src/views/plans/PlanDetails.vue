<template>
  <v-container fluid v-if="plan._id">
    <v-alert
      class="mt-10"
      dark
      text
      type="warning"
      color="warning darken-4"
      v-if="!isMember"
    >
      You can view sensitive information such as names and location once you're
      a member.
    </v-alert>

    <plan-details-tabs
      :is-member="isMember"
      @accept="onAccept"
      @thumb-up="onThumbUp"
      @thumb-down="onThumbDown"
      @add-friend="onAddFriend"
      @decline="onDecline"
      @kick="onKick"
      @join='init'
      :plan="plan"
      @send="send"
    />
    <v-fab-transition>
      <Button
        @click="onInviteFriends"
        label=""
        color="primary"
        fab
        large
        dark
        bottom
        right
        :class="{
          'invite-friends': true,
          'hidden': keyboardActive
        }"
      >
        <v-icon>mdi-account-multiple-plus</v-icon>
      </Button>
    </v-fab-transition>

    <confirm-dialog
      :dialog="showKick"
      entity="user"
      name-key="first_name"
      icon="mdi-exit-to-app"
      action="remove"
      :data="kickUserData"
      @ok="onKickConfirm"
      @cancel="onKickCancel"
    ></confirm-dialog>

    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import PlanDetailsTabs from '../../components/plans/PlanDetailsTabs';
import { getError } from '../../helpers/requests';
import Button from '../../components/generic/Button';
import ConfirmDialog from '../../components/generic/ConfirmDialog';

export default {
  name: 'PlanDetails',
  components: { ConfirmDialog, Button, PlanDetailsTabs },
  data() {
    return {
      kickUserId: '',
      showKick: false,
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    ...mapGetters(['plans', 'keyboardActive']),
    kickUserData() {
      const { plan } = this;
      if (plan) {
        return (
          plan.members.find((member) => member._id === this.kickUserId) || {}
        );
      }

      return {};
    },
    id() {
      return this.$route.params.id;
    },
    plan() {
      return this.plans ? this.plans.find((p) => p._id === this.id) || {} : {};
    },
    isMember() {
      return (
        this.user &&
        this.user._id &&
        this.plan &&
        this.plan.members.some(
          (member) => member === this.user._id || member._id === this.user._id
        )
      );
    },
  },
  methods: {
    ...mapActions([
      'getPlan',
      'acceptRequest',
      'declineRequest',
      'addMessage',
      'sendMessage',
      'thumbUp',
      'kickUser',
      'thumbDown',
      'updatePlanLocal',
      'sendFriendRequest',
      'loadFriendsList'
    ]),
    onAddFriend(user) {
      this.sendFriendRequest({
        user,
      })
        .then(() => {
          this.init();
        })
        .catch((err) => {
          this.$notify({
            group: 'main',
            title: 'Failed sending friend request .',
            text: getError(err),
            type: 'error',
          });
        });
    },
    onThumbUp(user) {
      this.thumbUp({
        user,
        plan: this.id,
      }).catch((err) => {
        this.$notify({
          group: 'main',
          title: 'Failed thumbs up.',
          text: getError(err),
          type: 'error',
        });
      });
    },
    onThumbDown(user) {
      this.thumbDown({
        user,
        plan: this.id,
      }).catch((err) => {
        this.$notify({
          group: 'main',
          title: 'Failed thumbs down.',
          text: getError(err),
          type: 'error',
        });
      });
    },
    send(text) {
      this.sendMessage({
        id: this.id,
        text,
      }).catch((err) => {
        this.$notify({
          group: 'main',
          title: 'Failed to update plan',
          text: getError(err),
          type: 'error',
        });
      });
    },
    init() {
      this.getPlan({ id: this.id });
      this.loadFriendsList();
    },
    onInviteFriends() {
      this.$router.push(`${this.id}/invite-friends`);
    },
    onAccept(user) {
      this.acceptRequest({
        plan: this.id,
        user,
      })
        .then(() => {
          this.$notify({
            group: 'main',
            title: 'Success',
            text: 'Successfuly accepted plan request',
            type: 'success',
          });
        })
        .catch((error) => {
          this.error = getError(error);
          this.$notify({
            group: 'main',
            title: 'Failed to update plan',
            text: this.error,
            type: 'error',
          });
        });
    },
    onDecline(user) {
      this.declineRequest({
        plan: this.id,
        user,
      })
        .then(() => {
          this.$notify({
            group: 'main',
            title: 'Success',
            text: 'Successfuly declined plan request',
            type: 'success',
          });
        })
        .catch((error) => {
          this.error = getError(error);
          this.$notify({
            group: 'main',
            title: 'Failed to update plan',
            text: this.error,
            type: 'error',
          });
        });
    },
    onKick(user) {
      this.showKick = true;
      this.kickUserId = user;
    },
    onKickCancel() {
      this.showKick = false;
      this.kickUserId = '';
    },
    onKickConfirm() {
      this.kick(this.kickUserId);
      this.kickUserId = '';
      this.showKick = false;
    },
    kick(user) {
      this.kickUser({
        id: this.id,
        user,
      })
        .then(() => {
          this.$notify({
            group: 'main',
            title: 'Success',
            text: 'Successfully removed user',
            type: 'success',
          });
        })
        .catch((error) => {
          this.error = getError(error);
          this.$notify({
            group: 'main',
            title: 'Failed to remove user',
            text: this.error,
            type: 'error',
          });
        });
    },
  },
  watch: {
    $route() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang='scss' scoped>

.invite-friends {
  position: fixed;
  bottom: 10vh;
  right: 25px;
  z-index: 10;
  &.hidden  {
    opacity: 0;
  }
}
</style>
