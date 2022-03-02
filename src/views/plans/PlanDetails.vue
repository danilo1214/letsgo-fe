<template>
  <v-container fluid v-if="plan._id">
    <plan-card class="mt-10" :plan="plan" @join="init" />

    <plan-details-tabs
      @accept="onAccept"
      @decline="onDecline"
      :plan="plan"
      @send="send"
    />
  </v-container>
</template>

<script>
import PlanCard from '../../components/plans/PlanCard';
import { mapState, mapActions } from 'vuex';
import { getData } from '@/helpers/requests';
import PlanDetailsTabs from '../../components/plans/PlanDetailsTabs';
import { getError } from '../../helpers/requests';

export default {
  name: 'PlanDetails',
  components: { PlanDetailsTabs, PlanCard },
  data() {
    return {
      plan: {},
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions([
      'getPlan',
      'acceptRequest',
      'declineRequest',
      'sendMessage',
    ]),
    send(text) {
      this.sendMessage({
        id: this.plan._id,
        text,
      })
        .then(() => {
          // TODO: this.plan = getData(data);
          this.init();
        })
        .catch((err) => {
          this.$notify({
            group: 'main',
            title: 'Failed to update plan',
            text: getError(err),
            type: 'error',
          });
        });
    },
    init() {
      this.getPlan({ id: this.id }).then((plan) => {
        this.plan = getData(plan);
      });
    },
    onAccept(user) {
      const { plan } = this;
      this.acceptRequest({
        plan: plan._id,
        user,
      })
        .then((plan) => {
          this.plan = getData(plan);
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
      const { plan } = this;
      this.declineRequest({
        plan: plan._id,
        user,
      })
        .then((plan) => {
          this.plan = getData(plan);
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

<style scoped></style>
