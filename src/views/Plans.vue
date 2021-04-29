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
      const {query} = this.$route;
      this.loadPlans({
        query
      })
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
