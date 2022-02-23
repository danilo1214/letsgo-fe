<template>
  <v-container fluid>
    <plan-card
      class="mt-10"
      :plan="plan"
      :editable="isAdmin"
      :deletable="isAdmin"
    />

    <plan-details-tabs :plan="plan" />
  </v-container>
</template>

<script>
import PlanCard from '../../components/plans/PlanCard';
import { mapState, mapActions } from 'vuex';
import { getData } from '@/helpers/requests';
import PlanDetailsTabs from '../../components/plans/PlanDetailsTabs';

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
    isAdmin() {
      return this.plan && this.user && this.plan.admin === this.user._id;
    },
  },
  methods: {
    ...mapActions(['getPlan']),
    init() {
      this.getPlan({ id: this.id }).then((plan) => {
        this.plan = getData(plan);
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
