<template>
  <v-autocomplete
    v-model="selected"
    :items="users"
    :loading="isLoading"
    :search-input.sync="search"
    item-text="name"
    item-value="_id"
    label="Add friends"
    placeholder="Start typing to Search"
    prepend-icon="mdi-account-plus"
    return-object
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        @click="data.select"
      >
        <v-avatar left>
          <v-img :src="data.item.photo_url"></v-img>
        </v-avatar>
        {{ data.item.name }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-avatar>
          <img :src="data.item.photo_url" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
    <template v-slot:append-outer>
        <Button :disabled='!selected || !selected._id' rounded color='primary darken-2' label='Add' @click='onAddFriend'> </Button>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapActions } from 'vuex';
import { getData, getError } from '../../helpers/requests';
import Button from '../generic/Button';

export default {
  name: 'SearchUsers',
  components: { Button },
  data() {
    return {
      isLoading: false,
      users: [],
      search: '',
      selected: {}
    }
  },
  computed: {

  },
  methods: {
    ...mapActions(['searchUsers', 'sendFriendRequest']),
    reset() {
      this.selected = {};
      this.search = '';
      this.users = []
    },
    onAddFriend() {
      this.sendFriendRequest({user: this.selected._id}).then(() => {
        this.$notify({
          group: 'main',
          title: 'Success',
          text: 'Successfully sent friend request',
          type: 'success',
        });
        this.reset();
      }).catch(e => {
        const err = getError(e);
        console.log(err);
        this.$notify({
          group: 'main',
          title: 'Error',
          text: err,
          type: 'error',
        });
      })
    },
  },
  watch: {
    search(name) {
      this.isLoading = true;
      this.searchUsers({name}).then(res => {
        this.users = getData(res);
        this.isLoading = false;
      }).catch(err => {
        console.log(err)
        this.isLoading = false;
      })

    }
  }
};
</script>

<style scoped>

</style>