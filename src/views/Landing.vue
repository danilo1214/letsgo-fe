<template>
  <div class="landing pa-16">
    <v-row>
      <v-col sm="12" md="6">
        <h1 class="text-xl-caption">LetsGo</h1>
        <p class="pt-4 text-body-1">
          Make social plans with strangers or friends on
          <strong>your</strong> terms!
        </p>
        <Button class="ml-3 mt-12" rounded to="/sign-in" label="Get Started" />
      </v-col>

      <v-col sm="12" md="6">
        <v-img src="../../public/assets/page.png" />
      </v-col>
    </v-row>

  </div>
</template>

<script>
import Button from '../components/generic/Button';
export default {
  name: 'Landing',
  components: { Button },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css? family=Montserrat:300,400,700&display=swap');

.landing {
  font-family: 'Montserrat', 'Roboto';
  h1 {
    font-size: 40px;
  }
}
</style>
