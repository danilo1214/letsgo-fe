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

        <Button text @click="$emit('cancel')" label="Cancel" />
        <Button text @click="$emit('delete')" label="Delete" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Button from './Button';
export default {
  name: 'ConfirmDialog',
  components: { Button },
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
