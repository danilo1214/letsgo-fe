<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="plan in plans" :key="plan._id" sm="12" md="6">
        <plan-card :plan="plan" @join="onPlanJoin"> </plan-card>
      </v-col>
    </v-row>
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
