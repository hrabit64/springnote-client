<template>
  <v-card color="success" elevation="0">
    <v-row>
      <v-col cols="12" class="text-center text-h5 bold-font">
        <v-img
          :src="thumbnail + '?width=300&height=200'"
          class="align-center pa-10"
          gradient="to top right, rgba(0, 0, 0, 0.66), rgba(0, 0, 0, 0.66)"
          cover
          rounded
        >
          <p>{{ name }}</p>
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-card
                class="mx-auto my-2"
                color="success"
                elevation="0"
                width="100%"
              >
                <v-skeleton-loader
                  type="card"
                  class="my-2"
                  width="100%"
                ></v-skeleton-loader>
              </v-card>
            </div>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

const getThumbnailSize = (thumbnail: string) => {
  if (mobile.value) {
    return thumbnail + '?width=200&height=200'
  }
  return thumbnail + '?width=600&height=400'
}
</script>
<style scoped></style>
