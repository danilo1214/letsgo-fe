<template>
  <v-form
      class="ma-10"
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-text-field
        v-model="plan.caption"
        :rules="required('Caption')"
        label="Caption"
        required
    ></v-text-field>

    <date-picker :range="false" :format-date="formatDate" @update="v=>plan.time =v">

    </date-picker>

    <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="onSubmit"
    >
      Submit
    </v-btn>

    <v-alert class="mt-15" type="error" v-if="error">
      {{ error }}
    </v-alert>
  </v-form>
</template>

<script>
import moment from "moment";
import DatePicker from "@/components/DatePicker";
export default {
  name: "NewPlan",
  components: {DatePicker},
  data() {
    return {
      valid: true,
      error: "",
      plan: {
        caption: "",
        time: ""
      }
    }
  },
  computed: {
    formatDate(){
      const {time} = this.plan;

      return moment(time).format("MM-DD-YYYY");
    }
  },
  methods: {
    required(field){
      return [v=> !!v || `${field} is required`];
    },
    onSubmit(){
      console.log(this.plan);
    }
  }
}
</script>

<style scoped>

</style>
