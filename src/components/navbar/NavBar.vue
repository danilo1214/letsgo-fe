<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="$emit('toggle')"></v-app-bar-nav-icon>

    <combo-box
      class="mt-5 search-text"
      label="Search by keywords..."
      :items="keywords"
      v-model="form.search"
      @keyup.enter.native="onSearch"
    />

    <v-menu v-model="menu" :close-on-content-click="false" left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </template>

      <v-card class="pa-3">
        <v-list>
          <v-list-item-title> Filters </v-list-item-title>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <Slider
            v-model="form.priceRange"
            label="Cost"
            class="mr-5"
            min="0"
            max="100"
            prepend-icon="mdi-cash-multiple"
            :formatter="formatPrice"
          />

          <date-picker
            range
            :format-date="formatDates"
            v-model="form.dates"
            placeholder="Select dates..."
          >
          </date-picker>
        </v-list>
      </v-card>
    </v-menu>

    <v-btn
      :disabled="!isChanged"
      @click="onSearch"
      fab
      small
      color="primary darken-1"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import DatePicker from '@/components/generic/DatePicker';
import Slider from '@/components/generic/Slider';
import lodash from 'lodash';
import ComboBox from '../generic/ComboBox';

export default {
  name: 'NavBar',
  components: { ComboBox, Slider, DatePicker },
  data() {
    return {
      menu: false,
      keywords: ['Party', 'Dance', 'Drinking', 'Sport', 'Coffee', 'Nature'],
      form: {
        dates: ['1', '2'],
        search: [],
        priceRange: [0, 0],
      },
      isChanged: false,
    };
  },
  computed: {
    ...mapGetters(['signedIn']),
  },
  methods: {
    formatDates(dates) {
      return dates.join(' - ');
    },
    init() {
      const { search, costFrom, costTo, dateFrom, dateTo } = this.$route.query;

      this.form.search = search ? search.split(' ') : '';
      this.form.priceRange = [costFrom || 0, costTo || costFrom || 0];
      this.form.dates = dateFrom && dateTo ? [dateFrom, dateTo] : [];
    },
    formatPrice(value) {
      return `$${value}`;
    },
    constructQuery() {
      const { dates, priceRange, search } = this.form;

      const query = {};

      if (dates.length !== 0) {
        query.dateFrom = dates[0];
        query.dateTo = dates[1];
      }

      if (
        priceRange.length !== 0 &&
        !(priceRange[0] === 0 && priceRange[1] === 0)
      ) {
        query.costFrom = priceRange[0];
        query.costTo = priceRange[1];
      }

      if (search && search.length !== 0) {
        query.search = search.join(' ');
      }

      return query;
    },
    onSearch() {
      const query = this.constructQuery();
      this.$router.push({
        name: 'plans',
        query,
      });
      this.isChanged = false;
    },
  },
  created() {
    this.init();
  },
  watch: {
    $route(route) {
      const currentQuery = this.constructQuery();
      if (!lodash.isEqual(currentQuery, route.query)) {
        this.init();
      }
    },
    form: {
      deep: true,
      handler() {
        this.isChanged = true;
      },
    },
  },
};
</script>

<style>
.search-text {
  min-width: 100px;
}

.v-select__selections {
  overflow: scroll;
  flex-wrap: nowrap;
}
.v-chip {
  overflow: initial;
}
</style>
