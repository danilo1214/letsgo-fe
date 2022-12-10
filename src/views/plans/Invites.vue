<template>
  <div class="pa-10">
    <v-subheader>Your invites</v-subheader>
    <v-divider></v-divider>
    <template v-if="invites.length">
      <plan-invite
        v-for="(invite, key) in invites"
        :key="key"
        :invite="invite"
        @decline="onDeclineInvite"
        @accept="onAcceptInvite"
      />
    </template>
    <h1 v-else class="mt-10">You are not invited to any new plans</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PlanInvite from '../../components/plans/PlanInvite';

export default {
  name: 'Invites',
  components: { PlanInvite },
  computed: {
    ...mapGetters(['invites']),
  },
  methods: {
    ...mapActions(['acceptInvite', 'loadFriendsList', 'declineInvite']),
    async onAcceptInvite(plan) {
      await this.acceptInvite({ plan });
      this.init();
    },
    async onDeclineInvite(plan) {
      await this.declineInvite({ plan });
      this.init();
    },
    init() {
      this.loadFriendsList();
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped></style>
