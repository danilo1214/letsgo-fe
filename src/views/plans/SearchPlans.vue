<template>
  <div class="pa-10">
    <Loader v-if='isLoading' />
    <template v-else>
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
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Plans from '@/components/plans/Plans';
import Loader from '../../components/generic/Loader';

export default {
  name: 'search-plans',
  components: { Loader, Plans },
  data() {
    return {
      isLoading: false,
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
    async init() {
      const { query } = this.$route;
      const { search, dateFrom, dateTo } = query;
      this.isLoading = true;
      await this.loadPlans({
        query,
      });
      this.isLoading = false;

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
