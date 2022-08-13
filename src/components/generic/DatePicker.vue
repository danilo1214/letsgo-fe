<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        class="mr-5"
        v-model="dateFormated"
        :rules="rules"
        prepend-icon="mdi-calendar"
        :placeholder="placeholder"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>

    <v-date-picker
      ref="picker"
      :value="value"
      :allowed-dates="disablePastDates"
      :range="range"
      min="1950-01-01"
      @input="setDate"
    >
      <v-spacer></v-spacer>
      <Button label="Cancel" text color="info" @click="$refs.menu.save(null)" />
      <Button label="OK" text @click="$refs.menu.save(value)" />
    </v-date-picker>
  </v-menu>
</template>

<script>
import Button from './Button';
export default {
  name: 'DatePicker',
  components: { Button },
  props: {
    value: {
      type: [Date, String, Array],
      default: null,
    },
    range: {
      type: Boolean,
      default: false,
    },
    formatDate: {
      type: Function,
      default: (date) => date,
    },
    rules: {
      type: Array,
    },
    placeholder: {
      type: String,
      default: 'Select Date',
    },
  },
  computed: {
    dateFormated() {
      return this.formatDate(this.value);
    },
  },
  methods: {
    disablePastDates(val) {
      return val >= new Date().toISOString().substr(0, 10);
    },
    setDate(date) {
      this.$emit('input', date);
    },
  },
};
</script>

<style scoped></style>
