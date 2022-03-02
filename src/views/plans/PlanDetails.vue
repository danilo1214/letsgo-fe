<template>
  <v-container fluid v-if="plan._id">
    <plan-card class="mt-10" :plan="plan" @join="init" />

    <plan-details-tabs
      :is-member="isMember"
      @accept="onAccept"
      @thumb-up="onThumbUp"
      @thumb-down="onThumbDown"
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
      'sendMessage',
      'thumbUp',
      'thumbDown',
    ]),
    onThumbUp(user) {
      this.thumbUp({
        user,
        plan: this.plan._id,
      })
        .then(() => {
          this.init();
        })
        .catch((err) => {
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
        plan: this.plan._id,
      })
        .then(() => {
          this.init();
        })
        .catch((err) => {
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
