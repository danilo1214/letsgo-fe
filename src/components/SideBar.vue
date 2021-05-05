<template>
  <v-navigation-drawer
      absolute
      app
      v-model="drawer"
      permanent
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{ name }}</v-list-item-title>


    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title >{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import {mapState} from "vuex";
export default {
  name: "SideBar",
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home-city', link: "/" },
        { title: 'My Account', icon: 'mdi-account', link: "/account" },
        { title: 'Friends', icon: 'mdi-account-group-outline', link: "/friends" },
        {title: 'Sign out', icon: 'mdi-logout', link: "/sign-out"}
      ],
      mini: true,
    }
  },
  computed: {
    ...mapState(["user"]),
    name(){
      const {user} = this;
      return `${user.first_name} ${user.last_name}`;
    }
  }
}
</script>

<style scoped>

</style>
