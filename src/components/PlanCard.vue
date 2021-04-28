<template>
  <v-card
      class="mx-auto ma-10"
  >
    <v-card-title>
      <span class="title">{{ plan.caption }}</span>
    </v-card-title>


    <v-card-text>
      {{plan.description}}
    </v-card-text>


    <v-card-actions>

        <v-icon class="mr-1" dark color="blue">
          mdi-calendar
        </v-icon>
        <span class="subheading mr-2">{{ formatDate }}</span>
        <v-icon class="mr-1" color="blue" medium>
          mdi-cash-multiple
        </v-icon>
        <span class="subheading">${{ plan.cost_lower }} - ${{plan.cost_upper}}</span>

    </v-card-actions>
  </v-card>
</template>

<script>
import moment from "moment"
export default {
  name: "PlanCard",
  props: ["plan"],
  computed: {
    formatDate(){
      const {plan} = this;

      return moment(plan.time).format("MM/DD/YYYY HH:mm a");
    }
  }
}
</script>

<style scoped>

</style>
