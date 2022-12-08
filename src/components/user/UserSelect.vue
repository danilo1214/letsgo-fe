<template>
  <v-autocomplete
    :value="value"
    @input="(v) => $emit('input', v)"
    :items="users"
    chips
    rounded
    filled
    color="blue-grey lighten-2"
    label="Friends"
    item-text="name"
    item-value="_id"
    multiple
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="remove(data.item)"
      >
        <v-avatar left>
          <v-img :src="data.item.photo_url"></v-img>
        </v-avatar>
        {{ data.item.first_name }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-avatar>
          <img :src="data.item.photo_url" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.first_name"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'UserSelect',
  props: {
    value: {
      type: Array,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {
    remove(user) {
      this.$emit(
        'input',
        this.users.filter((u) => u._id !== user._id)
      );
    },
  },
};
</script>

<style scoped></style>
