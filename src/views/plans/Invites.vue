<template>
  <div class="pa-10">
    <v-subheader>Your invites</v-subheader>
    <v-divider></v-divider>
    <template v-if="invites.length">
      <plan-invite v-for="(invite, key) in invites" :key="key" :invite='invite'/>
    </template>
    <h1 v-else class="mt-10">You are not invited to any new plans</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlanInvite from '../../components/plans/PlanInvite';

export default {
  name: 'Invites',
  components: { PlanInvite },
  computed: {
    ...mapGetters(['invites']),
  },
};
</script>

<style scoped></style>
