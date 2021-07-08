<template>
<v-container fluid>

  <plan-card v-for="plan in plans" :key="plan._id" :plan="plan" :editable="editable" :deletable="deletable">

  </plan-card>
</v-container>
</template>

<script>
import PlanCard from "@/components/PlanCard";

export default {
  name: "Plans",
  components: {PlanCard},
  props: ["plans", "editable", "deletable"]
}
</script>

<style scoped>

</style>
