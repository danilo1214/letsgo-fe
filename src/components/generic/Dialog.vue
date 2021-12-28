<template>
  <v-dialog @input="(v) => $emit('input', v)" :value="value">
    <v-card class="mx-auto">
      <v-toolbar color="primary" dark class="text-center">
        <v-toolbar-title
          ><v-icon light color="white" x-large class="ml-auto mr-auto">{{
            icon
          }}</v-icon></v-toolbar-title
        >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <slot />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
