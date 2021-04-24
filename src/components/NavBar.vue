<template>
  <v-app-bar app height="140">

    <v-text-field rounded filled dense clearable class="mr-5 mt-5" prepend-icon="mdi-magnify" v-model="search" placeholder="Search Plans..."></v-text-field>


    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        left
        bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-card class="pa-5">
        <v-list>
          <v-list-item-title>
            Filters
          </v-list-item-title>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-range-slider
                v-model="priceRange"
                label="Price($)"
                thumb-label="always"
                class="mr-5"
                max="100"
                min="0"
            >
              <template v-slot:thumb-label="{value}">
                {{ formatPrice(value) }}
              </template>
            </v-range-slider>

          </v-list-item>

          <v-list-item>
            <v-menu ref="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    class="mr-5"
                    v-model="formatDates"
                    prepend-icon="mdi-calendar"
                    placeholder="Select Dates..."
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

          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>


    <v-btn color="primary">
      Search
    </v-btn>
  </v-app-bar>

</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      menu: false,
      search: "",
      dates: [],
      priceRange: [0,0]
    }
  },
  computed: {
    formatDates() {
      return this.dates.join(" - ");
    }
  },
  methods: {
    setDate(dates) {
      this.$refs.menu.save(dates)
    },
    formatPrice(value) {
      return `$${value}`;
    }
  }
}
</script>

<style scoped>

</style>
