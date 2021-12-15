<template>
  <v-menu ref="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          class="mr-5"
          v-model="formatDate"
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
        v-model="date"
        :range="range"
        min="1950-01-01"
        @change="setDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DatePicker",
  props: ["range", "formatDate", "rules", "placeholder"],
  data(){
    return {
      date: null
    }
  },
  methods: {
    setDate(date) {
      this.$refs.menu.save(date);
      this.$emit("update", date)
    },
  },
  created(){
    const {range} = this;
    this.date = range? [] : "";
  }
}
</script>

<style scoped>

</style>
