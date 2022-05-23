<template>
  <div class="landing pa-16">
    <v-row>
      <v-col sm="12" md="6">
        <h1 class="text-xl-caption">LetsGo</h1>
        <p class="pt-4 text-body-1">
          Make social plans with strangers or friends on
          <strong>your</strong> terms!
        </p>
        <Button
          class="mt-12"
          rounded
          to="/plans/"
          text
          label="What's popular?"
        />
        <Button class="ml-3 mt-12" rounded to="/sign-in" label="Get Started" />
      </v-col>

      <v-col sm="12" md="6">
        <v-img src="../../public/assets/default.jpg" height="400" />
      </v-col>
    </v-row>

    <h1 class="mt-16">What do people think?</h1>

    <v-row class="mt-12">
      <v-col>
        <Testimonial
          name="John Doe"
          text="LetsGo makes me feel safe when going out with strangers!"
        />
      </v-col>
      <v-col>
        <Testimonial
          name="Mr. Bean"
          text="Finally I can find someone with my super specific interests."
        />
      </v-col>
      <v-col>
        <Testimonial name="Kendrick Auston" text="Damn, no cap it is lit" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Button from '../components/generic/Button';
import Testimonial from '../components/generic/Testimonial';
export default {
  name: 'Landing',
  components: { Testimonial, Button },
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
