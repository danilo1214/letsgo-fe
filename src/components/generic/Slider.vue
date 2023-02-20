<template>
  <div>
    <v-subheader v-if='label'>
      {{ label }}
    </v-subheader>

    <v-range-slider
      :value="value"
      v-bind="$attrs"
      @input="onInput"
      :rules="rules"
      class="mr-5"
      max="100"
      min="0"
    >
      <template v-slot:thumb-label="{ value }">
        {{ formatter(value) }}
      </template>
    </v-range-slider>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    value: {
      type: [Array, String, Number],
      required: true,
    },
    rules: {
      type: Array,
      default: () => Array.from([]),
    },
    formatter: {
      type: Function,
      default: (v) => v,
    },
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style scoped></style>
