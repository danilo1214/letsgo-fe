<template>
  <v-app-bar app color="blue" dark>
    <v-toolbar-title>Letsgo</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-text-field v-model="search" placeholder="Search Plans..."></v-text-field>

    <v-menu         ref="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="formatDates"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          ref="picker"
          v-model="dates"
          range
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
          @change="setDate"
      ></v-date-picker>
    </v-menu>


    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>

</template>

<script>
export default {
  name: "NavBar",
  data(){
    return {
      search: "",
      dates: []
    }
  },
  computed: {
    formatDates(){
      return this.dates.join(" - ");
    }
  },
  methods: {
    setDate(dates){
      this.$refs.menu.save(dates)
    }
  }
}
</script>

<style scoped>

</style>
