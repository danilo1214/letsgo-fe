<template>
  <v-card class="mx-auto ma-10 t">
    <v-card-title>{{ name }}</v-card-title>
    <Avatar class="ml-5" :size="150" :user="user" />
    <v-divider class="mt-10"></v-divider>
    <v-list class="mt-10">
      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary darken-1">mdi-email</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.email }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary darken-1">mdi-gender-male-female</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.sex }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary darken-1">mdi-cake-variant</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ date }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import Avatar from './Avatar';
import moment from 'moment';

export default {
  name: 'UserCard',
  components: { Avatar },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    name() {
      return `${this.user.first_name} ${this.user.last_name}`;
    },
    date() {
      return moment(this.user.birth_date).format('YYYY-MM-DD');
    },
    photo() {
      return this.user.photo_url || '../../assets/default.jpg';
    },
  },
};
</script>

<style scoped></style>
