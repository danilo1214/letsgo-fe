<template>
  <v-form class="ma-10 pa-10" ref="form" v-model="valid" lazy-validation>
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

    <Slider
      v-model="costRange"
      :rules="required('Cost')"
      label="Cost"
      class="mr-5"
      prepend-icon="mdi-cash-multiple"
      :formatter="formatCost"
    />

    <date-picker
      placeholder="Select Date..."
      v-model="plan.date"
      :rules="required('Date')"
    >
    </date-picker>

    <Button
      :disabled="!valid"
      class="mr-4"
      @click="onSubmit"
      label="Make Plan"
      icon-left="mdi-calendar-plus"
    />

    <v-alert class="mt-15" type="error" v-if="error">
      {{ error }}
    </v-alert>
  </v-form>
</template>

<script>
import DatePicker from '@/components/generic/DatePicker';
import { mapActions, mapState } from 'vuex';
import Slider from '../../components/generic/Slider';
import Button from '../../components/generic/Button';

export default {
  name: 'NewPlan',
  components: { Button, Slider, DatePicker },
  data() {
    return {
      valid: true,
      error: '',
      plan: {
        caption: '',
        time: '',
        longitude: 0,
        latitude: 0,
      },
      costRange: [0, 0],
    };
  },
  computed: {
    ...mapState(['user']),
    admin() {
      return this.user.id;
    },
  },
  methods: {
    ...mapActions(['createPlan']),
    formatCost(value) {
      return `$${value}`;
    },
    required(field) {
      return [(v) => !!v || `${field} is required`];
    },
    onSubmit() {
      const { plan, admin, costRange } = this;
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
          cost_lower,
        },
      })
        .then(() => {
          this.$router.replace({ name: 'plans' });
        })
        .catch((err) => {
          this.error = err.response.data.error;
        });
    },
  },
};
</script>

<style scoped></style>
