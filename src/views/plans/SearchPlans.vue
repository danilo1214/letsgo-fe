<template>
  <div class="pa-10">
    <v-alert v-if="query.keywords" type="info"
      >Searching for keywords {{ query.keywords }}</v-alert
    >
    <v-alert v-if="priceRange" type="info">{{ priceRange }}</v-alert>
    <v-alert v-if="query.dates.length" type="info"
      >Searching for dates between {{ query.dates[0] }} -
      {{ query.dates[1] }}</v-alert
    >
    <v-subheader>Results</v-subheader>
    <v-divider></v-divider>
    <Plans v-if="plans && plans.length" :plans="plans" />
    <h1 class="text-center mt-15" v-else>Sorry, no plans were found</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Plans from '@/components/plans/Plans';

export default {
  name: 'search-plans',
  components: { Plans },
  data() {
    return {
      query: {
        keywords: '',
        dates: [],
      },
    };
  },
  computed: {
    ...mapGetters(['plans']),
    priceRange() {
      const { costFrom, costTo } = this.$route.query;

      if (costFrom === undefined && costTo === undefined) {
        return '';
      }

      if (costFrom === 0 && costTo === 0) {
        return 'Searching for free plans';
      }

      if (costFrom && !costTo) {
        return `Searching for price below $${costFrom}.`;
      }

      if (costFrom && !costTo) {
        return `Searching for price above $${costFrom}.`;
      }

      return `Searching for price between $${costFrom} and $${costTo}`;
    },
  },
  methods: {
    ...mapActions(['loadPlans']),
    init() {
      const { query } = this.$route;
      const { search, dateFrom, dateTo } = query;

      this.loadPlans({
        query,
      });

      this.query.keywords = search ? search.split(' ').join(', ') : '';
      this.query.dates = dateFrom && dateTo ? [dateFrom, dateTo] : [];
    },
  },
  created() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    },
  },
};
</script>

<style scoped></style>
