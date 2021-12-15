<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        Delete {{ entity }}
      </v-card-title>

      <v-card-text>
        Are you sure you want to delete the {{ entity }} '{{name}}'? All data related to it will be lost.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            text
            @click="onCancel"
        >
          Cancel
        </v-btn>

        <v-btn
            color="primary"
            text
            @click="onDelete"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteDialog",
  props: ["dialog", "entity", "data", "nameKey", "onDelete", "onCancel"],
  computed: {
    name() {
      const {data, nameKey} = this;
      return data[nameKey];
    }
  }
}
</script>

<style scoped>

</style>