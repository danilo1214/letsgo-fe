<template>
  <v-card class="mx-auto">
    <v-subheader class="title text-right">{{ name }} <span class="font-italic pl-2">({{age}})</span></v-subheader>
    <v-row>
      <v-col>
        <Avatar class="ml-5" :size="150" :user="user" />
      </v-col>
      <v-col>
        <v-col>
          <slot />
        </v-col>
      </v-col>
    </v-row>
    <v-divider class="mt-2"></v-divider>
    <v-list>
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
import Avatar from "./Avatar";
import moment from "moment";

export default {
  name: "UserCard",
  components: { Avatar },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    name() {
      return `${this.user.first_name} ${this.user.last_name}`;
    },
    age() {
      return moment().diff(moment(this.user.birth_date), 'years');
    },
    date() {
      return moment(this.user.birth_date).format("YYYY-MM-DD");
    },
    photo() {
      return this.user.photo_url || "../../assets/default.jpg";
    }
  }
};
</script>

<style scoped></style>
