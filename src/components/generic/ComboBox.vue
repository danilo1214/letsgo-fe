<template>
  <v-combobox
    dense
    rounded
    filled
    v-bind="$attrs"
    :value="value"
    @input="(v) => $emit('input', v)"
    :hide-no-data="!search"
    :items="items"
    :search-input.sync="search"
    hide-selected
    multiple
    small-chips
    solo
  >
    <template v-slot:no-data>
      <v-list-item @click="addItem(search)">
        <span class="subheading">Search for</span>
        <v-chip color="primary lighten-1 ml-3" label small>
          {{ search }}
        </v-chip>
      </v-list-item>
    </template>
    <template v-slot:selection="{ attrs, item, parent, selected }">
      <v-chip
        v-bind="attrs"
        color="primary lighten-2"
        :input-value="selected"
        label
        small
      >
        <span class="pr-2">
          {{ item }}
        </span>
        <v-icon small @click="parent.selectItem(item)"> $delete </v-icon>
      </v-chip>
    </template>
    <template v-slot:item="{ index, item }">
      <v-chip color="primary lighten-3`" dark label small>
        {{ item }}
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
export default {
  name: 'ComboBox',
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    search: '',
  }),
  methods: {
    addItem(v) {
      this.$emit('input', [...this.value, v]);
      this.search = '';
    },
  },
};
</script>

<style scoped></style>
