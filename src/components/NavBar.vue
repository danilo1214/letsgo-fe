<template>
  <v-app-bar app>

    <v-text-field @input="onChange" rounded filled dense clearable class="mt-5" prepend-icon="mdi-magnify" v-model.lazy="search" placeholder="Search Plans..."></v-text-field>


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
          <v-icon>mdi-filter-variant</v-icon>
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
                @change="onChange"
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
            <date-picker :range="true" :format-date="formatDates" @update="setDate" :placeholder="'Select dates...'" :initial-date="dates">

            </date-picker>

          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>


    <v-btn color="primary" @click="onSearch" :disabled="!isChanged">
      Search
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn color="info" v-if="loggedIn" to="/new">
      Create
    </v-btn>

    <v-btn color="info" v-else to="/login">
      Sign in
    </v-btn>
  </v-app-bar>

</template>

<script>
import {mapGetters} from "vuex";
import DatePicker from "@/components/DatePicker";

export default {
  name: "NavBar",
  components: {DatePicker},
  data() {
    return {
      menu: false,
      dates: [],
      search: "",
      isChanged: false,
      priceRange: [0,0]
    }
  },
  computed: {
    ...mapGetters(["loggedIn"]),
    formatDates() {
      return this.dates.join(" - ");
    }
  },
  methods: {
    init(){
      const {search, costFrom, costTo, dateFrom, dateTo} = this.$route.query;

      this.search = search || "";
      this.priceRange = [costFrom || 0, costTo || costFrom || 0];
      this.dates = dateFrom && dateTo? [dateFrom, dateTo] : [];
    },
    onChange(){
      this.isChanged = true;
    },
    setDate(dates) {
      this.dates = dates;
      this.onChange();
    },
    formatPrice(value) {
      return `$${value}`;
    },
    onSearch(){
      const {dates, priceRange, search} = this;

      const query = {}

      if(dates.length !== 0){
        query.dateFrom = dates[0];
        query.dateTo = dates[1];
      }

      if(priceRange.length !== 0 && !(priceRange[0] === 0 && priceRange[1] === 0)){
        query.costFrom = priceRange[0];
        query.costTo = priceRange[1];
      }

      if(search && search.length !== 0){
        query.search = search
      }

      this.$router.push({
        name: "plans",
        query
      });
      this.isChanged = false;
    }
  },
  created() {
    this.init();
  },
  watch: {
    $route(){
      this.init();
    }
  }
}
</script>

<style scoped>

</style>
