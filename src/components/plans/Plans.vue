<template>
  <v-container fluid>
    <plan-card
      v-for="plan in plans"
      :key="plan._id"
      :plan="plan"
      @join="onPlanJoin"
    >
    </plan-card>
  </v-container>
</template>

<script>
import PlanCard from '@/components/plans/PlanCard';

export default {
  name: 'Plans',
  components: { PlanCard },
  props: ['plans'],
  methods: {
    onPlanJoin(id) {
      this.$router.push(`/plan/${id}`);
    },
  },
};
</script>

<style scoped></style>
