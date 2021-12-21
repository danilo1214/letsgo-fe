<template>
  <div>
    <v-form
      class="pa-5 pa-lg-16 ma-lg-16"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <Loader v-if="isLoading" />
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

      <v-time-picker format="ampm" v-model="plan.time"></v-time-picker>

      <v-alert class="mt-15" type="error" v-if="error">
        {{ error }}
      </v-alert>

      <div class="mt-15">
        <Button
          class="mr-4"
          @click="onCancel"
          label="Cancel"
          text
          color="secondary"
        />
        <Button
          :disabled="!valid"
          @click="onSubmit"
          label="Make Plan"
          icon-left="mdi-calendar-plus"
        />
      </div>
    </v-form>
  </div>
</template>

<script>
import DatePicker from '@/components/generic/DatePicker';
import { mapActions, mapState } from 'vuex';
import Slider from '../../components/generic/Slider';
import Button from '../../components/generic/Button';
import Loader from '../../components/generic/Loader';

export default {
  name: 'NewPlan',
  components: { Loader, Button, Slider, DatePicker },
  data() {
    return {
      valid: true,
      isLoading: false,
      error: '',
      plan: {
        caption: '',
        time: '',
        date: null,
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
    onCancel() {
      this.$router.go(-1);
    },
    onSubmit() {
      const { plan, admin, costRange } = this;

      const valid = this.$refs.form.validate();
      if (!valid) {
        return;
      }

      const cost_lower = costRange[0];
      const cost_upper = costRange[1];
      plan.date = `${plan.date} ${plan.time}`;
      this.isLoading = true;

      this.createPlan({
        plan: {
          ...plan,
          admin,
          cost_upper,
          cost_lower,
        },
      })
        .then(() => {
          this.isLoading = false;
          this.$router.replace({ name: 'plans' });
        })
        .catch((err) => {
          this.isLoading = false;
          this.error = err.response.data.error;
        });
    },
  },
};
</script>

<style scoped></style>
