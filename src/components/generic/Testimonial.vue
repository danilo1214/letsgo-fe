<template>
  <v-card
    v-bind="$attrs"
    :color="color"
    dark
    max-width="400"
    height='250'
  >
    <v-card-text class="text-h5 font-weight-bold">
      "{{text}}"
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Testimonial',
  props: {
    color: {
      type: String,
      default: 'primary lighten-1'
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.v-card__actions {
  position: absolute;
  bottom: 0;
}

</style>