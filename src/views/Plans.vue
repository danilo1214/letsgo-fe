<template>
<v-container fluid>

  <plan-card v-for="plan in plans" :key="plan._id" :plan="plan">

  </plan-card>
</v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import PlanCard from "@/components/PlanCard";

export default {
  name: "Events",
  components: {PlanCard},
  computed: {
    ...mapGetters(["plans"])
  },
  methods: {
    ...mapActions(["loadPlans"]),
    init() {
      const {
        startDate,
        endDate,
        search,
        startPrice,
        endPrice
      } = this.$route.query;

      console.log(startDate,endDate,search,startPrice, endPrice);

      this.loadPlans({query: {
          caption: search,
          dateFrom: startDate,
          dateTo: endDate,
          priceFrom: Number(startPrice) || undefined,
          priceTo: Number(endPrice) || undefined
        }})
    },
  },
  created() {
    this.init();
  },
  watch: {
    $route(){
      this.init();
    }
  }
}
</script>

<style scoped>

</style>
