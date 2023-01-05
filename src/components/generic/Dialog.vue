<template>
  <v-dialog @input="(v) => $emit('input', v)" :value="value">
    <v-card class="mx-auto">
      <v-toolbar :color="color" dark class="text-center">
        <v-toolbar-title
          ><v-icon color="white" x-large class="ml-auto mr-auto">{{
            icon
          }}</v-icon></v-toolbar-title
        >
        <v-toolbar-title class="ml-10">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <slot />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
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
