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
        prepend-icon="mdi-format-quote-open"
        required
    ></v-text-field>
    <v-textarea
        v-model="plan.description"
        :rules="required('Description')"
        label="Description"
        clearable
        auto-grow
        prepend-icon="mdi-comment"
    ></v-textarea>

    <v-text-field
        prepend-icon="mdi-map-marker"
        v-model="plan.address"
        :rules="required('Address')"
        label="Address"
        required
    ></v-text-field>

    <v-range-slider
        v-model="costRange"
        :rules="required('Cost')"
        label="Cost($)"
        class="mr-5"
        max="100"
        min="0"
    >
      <template v-slot:thumb-label="{value}">
        {{ formatCost(value) }}
      </template>
    </v-range-slider>


    <date-picker :placeholder="'Select Date...'" :range="false" :format-date="formatDate" @update="v=>plan.time =v"
                 :rules="required('Date')">

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
import {mapActions, mapState} from "vuex";

export default {
  name: "NewPlan",
  components: {DatePicker},
  data() {
    return {
      valid: true,
      error: "",
      plan: {
        caption: "",
        time: "",
        longitude: 0,
        latitude: 0
      },
      costRange: [0,0]
    }
  },
  computed: {
    ...mapState(["user"]),
    admin() {
      return this.user.id;
    },
    formatDate() {
      const {time} = this.plan;

      return time ? moment(time).format("MM-DD-YYYY") : '';
    }
  },
  methods: {
    ...mapActions(["createPlan"]),
    formatCost(value) {
      return `$${value}`;
    },
    required(field) {
      return [v => !!v || `${field} is required`];
    },
    onSubmit() {
      const {plan, admin, costRange} = this;
      const valid = this.$refs.form.validate();
      const cost_lower = costRange[0];
      const cost_upper = costRange[1];

      if (!valid) {
        return;
      }

      this.createPlan({
        plan: {
          ...plan,
          admin,
          cost_upper,
          cost_lower
        }
      }).then(() => {
        this.$router.replace({name: "plans"});
      }).catch(err => {
        console.log("hi er");
        console.log(err.response);
        this.error = err.response.data.error;
      });
    }
  }
}
</script>

<style scoped>

</style>
