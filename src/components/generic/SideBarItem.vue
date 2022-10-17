<template>
  <v-list-item class="pt-2 pb-2" :to="item.link" link>
    <v-list-item-icon>
      <v-badge
        v-if="item.notifications"
        color="error"
        :content="item.notifications"
      >
        <v-icon>
          {{ item.icon }}
        </v-icon>
      </v-badge>
      <v-icon v-else>
        {{ item.icon }}
      </v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'SideBarItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
