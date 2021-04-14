<template>
  <v-dialog
      persistent
      value="true"
      transition="dialog-top-transition"
      max-width="600"
  >
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >You are not logged in</v-toolbar>
        <v-card-text>
          <div class="text-h4 pa-12">Login to fully use Letsgo </div>
        </v-card-text>

      </v-card>
  </v-dialog>


</template>

<script>
export default {
name: "LoginBanner"
}
</script>

<style scoped>

</style>
