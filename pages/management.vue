<template>
  <client-only>
    <v-container
      class="d-flex justify-center align-center fill-height"
      width="100%"
    >
      <!-- permission check -->
      <v-dialog
        v-model="permissionCheck"
        fullscreen
        scrim="success"
        persistent
        no-click-animation
        class="no-transition"
        transition="false"
        :open-delay="0"
        style="overflow-y: hidden"
        overlay-color="black"
      >
        <v-card color="success" style="overflow-y: hidden">
          <v-row align="center" justify="center">
            <v-col cols="8" class="text-center">
              <v-row>
                <v-spacer></v-spacer>

                <v-col cols="12">
                  <v-progress-circular
                    indeterminate
                    :size="128"
                  ></v-progress-circular>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
      <v-row justify="center" align="center" class="mx-5">
        <v-col cols="12" class="text-center">
          <h1 class="text-h3 bold-font">
            <v-icon>mdi-alert</v-icon>This Is Admin Page
          </h1>
          <h3 class="text-h5 bold-font">
            If you don't have any permission, this page not working.
          </h3>
          <h3 class="text-h5 bold-font">포스트 관리</h3>
        </v-col>
      </v-row>
    </v-container>
  </client-only>
</template>

<script lang="ts" setup>
const permissionCheck = ref(true)

import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { isAdmin } = storeToRefs(userStore)

const router = useRouter()
onMounted(() => {
  if (isAdmin.value) {
    permissionCheck.value = false
  } else {
    router.push('/')
  }
})
</script>

<style></style>
