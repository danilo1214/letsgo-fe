<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5">
        {{ action.toUpperCase() }} {{ entity }}
      </v-card-title>

      <v-card-text>
        Are you sure you want to {{ action }} the {{ entity }} '{{ name }}'?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="$emit('cancel')"> Cancel </v-btn>

        <v-btn color="primary" text @click="$emit('delete')"> Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    action: {
      type: String,
      required: true,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
    entity: {
      type: String,
      required: true,
    },
    nameKey: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    name() {
      const { data, nameKey } = this;
      return data[nameKey];
    },
  },
};
</script>

<style scoped></style>
