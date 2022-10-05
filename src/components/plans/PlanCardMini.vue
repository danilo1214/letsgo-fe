<template>
  <v-card class="mx-auto ma-10 plan-card" :to="`/plan/${plan._id}`">
    <v-card-title>
      <span class="title">{{ plan.caption }}</span>
    </v-card-title>

    <v-card-text>
      {{ plan.description }}
    </v-card-text>

    <v-card-text>
      <v-icon class="mr-1" dark color="primary darken-2">
        mdi-calendar</v-icon
      >
      <span class="subheading mr-2">{{ formatDate }}</span>
    </v-card-text>

    <v-card-text>
      <v-icon class="mr-1" color="primary darken-2" medium>
        mdi-cash-multiple</v-icon
      >
      <span class="subheading">{{ cost }}</span>
    </v-card-text>

    <v-card-text>
      <v-icon class="mr-1" color="primary darken-2" medium>
        mdi-map-marker</v-icon
      >
      <span class="subheading">{{ address }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PlanCardMini',
  props: {
    plan: {
      type: Object,
      required: true
    }
  },
  computed:  {
    formatDate() {
      const { date, time } = this.plan;
      return `${moment(date).format('DD.MM.YYYY')} ${time || ''}`;
    },
    getPlanImage() {
      return this.plan.photo_url || '../../../assets/default.jpg';
    },
    address() {
      return this.plan.address || 'Hidden';
    },
    cost() {
      const { cost_lower, cost_upper } = this.plan;
      if (cost_lower === 0 && cost_upper === 0) return 'Free';
      else if (cost_upper === cost_lower) return `$${cost_upper}`;
      return `$${cost_lower} - $${cost_upper}`;
    },
  }
};
</script>

<style scoped>

</style>