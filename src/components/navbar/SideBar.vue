<template>
  <v-navigation-drawer
    app
    :value="value"
    @input="(v) => $emit('input', v)"
    mobile-breakpoint="xs"
  >
    <v-list-item class="px-2" v-if='signedIn'>
      <Avatar :user="user" />
      <v-list-item-title>{{ name }}</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in availableRoutes"
        :key="item.title"
        :to="item.link"
        link
      >
        <v-list-item-icon>
          <v-icon v-if="item.title !== 'Friends' || !friendRequests.length">{{
              item.icon
            }}</v-icon>
          <v-badge v-else :content="friendRequests.length">
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-badge>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <div class="mt-5">
      <Button
        v-if="signedIn"
        class="ml-5"
        label="Plan"
        icon-left="mdi-plus"
        to="/new"
      />
      <Button
        v-else
        class="ml-5"
        to="/sign-in"
        label="Sign in"
        icon-left="mdi-import"
      />
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Button from '@/components/generic/Button';
import Avatar from '@/components/user/Avatar';

export default {
  name: 'SideBar',
  components: { Avatar, Button },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      items: [
        { title: 'Home', icon: 'mdi-home-city', link: '/', isPublic: true},
        { title: 'My Account', icon: 'mdi-account', link: '/account', isPublic: false},
        { title: 'My Plans', icon: 'mdi-calendar', link: '/my-plans', isPublic: false },
        { title: 'Friends', icon: 'mdi-account-group', link: '/friends', isPublic: false },
        { title: 'Sign Out', icon: 'mdi-logout', link: '/sign-out', isPublic: false },
      ],
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    ...mapGetters(['signedIn', 'friendRequests']),
    availableRoutes() {
      if(this.signedIn) {
        return this.items;
      }
      return this.items.filter(item => item.isPublic);
    },
    name() {
      return `${this.user.first_name} ${this.user.last_name}`;
    },
  },
};
</script>

<style scoped></style>
