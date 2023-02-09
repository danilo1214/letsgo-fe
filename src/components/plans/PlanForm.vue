<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <div>
      <v-text-field
        v-model="plan.caption"
        :rules="required('Caption')"
        placeholder="Caption"
        rounded
        prepend-icon="mdi-format-quote-open"
        filled
        required
      ></v-text-field>
      <v-textarea
        v-model="plan.description"
        :rules="required('Description')"
        placeholder="Description"
        clearable
        auto-grow
        filled
        rounded
        prepend-icon="mdi-comment"
      ></v-textarea>

      <v-text-field
        prepend-icon="mdi-map-marker"
        v-model="plan.address"
        :rules="required('Address')"
        placeholder="Address"
        filled
        rounded
        required
      ></v-text-field>

      <v-text-field
        prepend-icon="mdi-city"
        v-model="plan.city"
        :rules="required('City')"
        placeholder="City"
        filled
        rounded
        required
      ></v-text-field>

      <Slider
        v-model="costRange"
        :rules="required('Cost')"
        placeholder="Cost"
        class="mr-5"
        filled
        prepend-icon="mdi-cash-multiple"
        :formatter="formatCost"
      />

      <date-picker
        placeholder="Select Date..."
        v-model="plan.date"
        :rules="required('Date')"
        filled
      >
      </date-picker>

      <v-time-picker
        class="time-picker mx-auto"
        format="ampm"
        v-model="plan.time"
        :rules="required('time')"
      ></v-time-picker>
    </div>

    <v-alert class="mt-15" type="error" v-if="error">
      {{ error }}
    </v-alert>

    <v-card-actions class="mt-15">
      <v-spacer />
      <Button
        rounded
        class="mr-4"
        @click="$emit('cancel')"
        label="Cancel"
        text
        color="secondary"
      />
      <Button
        rounded
        :disabled="!valid || isLoading"
        @click="onSubmit"
        :label="okLabel"
        icon-left="mdi-calendar-plus"
      />
    </v-card-actions>
  </v-form>
</template>

<script>
import Button from '@/components/generic/Button';
import DatePicker from '@/components/generic/DatePicker';
import Slider from '@/components/generic/Slider';
import moment from 'moment';

export default {
  name: 'PlanForm',
  components: { Slider, DatePicker, Button },
  props: {
    error: {
      type: String,
      required: true,
    },
    okLabel: {
      type: String,
      default: 'Make Plan',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    initial: {
      type: Object,
      default: () => {
        return {
          time: '',
          date: null,
        };
      },
    },
  },
  data() {
    return {
      valid: true,
      costRange: [0, 0],
      plan: {},
    };
  },
  methods: {
    init() {
      this.plan = this.initial;
      const { cost_upper, cost_lower, date } = this.initial;

      if (cost_lower !== null && cost_upper !== null) {
        this.costRange = [cost_lower, cost_upper];
      }
      if (date) {
        this.plan.date = moment(date).format('YYYY-MM-DD');
      }
    },
    onSubmit() {
      const valid = this.$refs.form.validate();
      if (!valid) {
        return;
      }

      this.$emit('submit', {
        ...this.plan,
        cost_lower: this.costRange[0],
        cost_upper: this.costRange[1],
      });
    },
    formatCost(value) {
      return `$${value}`;
    },
    required(field) {
      return [(v) => !!v || `${field} is required`];
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss">
.time-picker {
  display: flex;
}
</style>
