<template>
  <v-container fluid v-if="plan._id">
    <v-fab-transition>
      <Button
        @click='onInviteFriends'
        label=''
        color='info'
        fab
        large
        dark
        bottom
        right
        class='invite-friends'
      >
        <v-icon>mdi-account-multiple-plus</v-icon>
      </Button>
    </v-fab-transition>
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

    <plan-card class="mt-10" :plan="plan" @join="init" />

    <plan-details-tabs
      :is-member="isMember"
      @accept="onAccept"
      @thumb-up="onThumbUp"
      @thumb-down="onThumbDown"
      @add-friend="onAddFriend"
      @decline="onDecline"
      :plan="plan"
      @send="send"
    />

    <router-view></router-view>
  </v-container>
</template>

<script>
import PlanCard from '../../components/plans/PlanCard';
import { mapState, mapActions, mapGetters } from 'vuex';
import PlanDetailsTabs from '../../components/plans/PlanDetailsTabs';
import { getError } from '../../helpers/requests';
import Button from '../../components/generic/Button';

export default {
  name: 'PlanDetails',
  components: { Button, PlanDetailsTabs, PlanCard },
  data() {
    return {};
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    ...mapGetters(['plans']),
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
      'thumbDown',
      'updatePlanLocal',
      'sendFriendRequest',
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
    },
    onInviteFriends() {
      this.$router.push(`${this.id}/invite-friends`)
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

<style scoped>
.invite-friends{
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 10;
}
</style>
