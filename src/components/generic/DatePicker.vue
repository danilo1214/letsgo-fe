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
      <v-btn
        text
        color="primary"
        @click="$refs.menu.save(date)"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DatePicker',
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
