<template>
<div>

  <div v-for="plan in plans" :key="plan._id">{{plan}}</div>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Events",
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
          dateTo: endDate
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
