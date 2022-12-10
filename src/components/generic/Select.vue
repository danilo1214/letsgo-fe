<template>
  <v-autocomplete
    :items="items"
    :value="value"
    @input="(v) => $emit('input', v)"
    v-bind="$attrs"
  ></v-autocomplete>
</template>

<script>
export default {
  name: 'Select',
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
