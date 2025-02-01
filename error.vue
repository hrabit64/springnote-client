<template>
  <v-app class="main-font bg-success">
    <MainAppBar />
    <client-only>
      <SideBar />
    </client-only>
    <v-main>
      <v-container class="fill-height d-flex mx-auto" fluid fill-height>
        <v-row class="fill-height d-flex" align="center" justify="center">
          <v-col
            cols="12"
            class="justify-center align-center"
            v-motion="{
              initial: {
                y: -8,
                x: -8
              },
              enter: {
                y: 8,
                x: 8,
                transition: {
                  duration: 1000,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }
              }
            }"
          >
            <v-img
              src="@/public/images/flying-bird.webp"
              class="justify-center align-center mx-auto"
              max-width="400"
            ></v-img>
          </v-col>
          <v-col cols="12" class="text-center bold-font">
            <h1 class="text-h1 bold-font text-primary">
              {{ error.statusCode }}
            </h1>
            <h1 class="text-h5">
              {{
                error.statusCode === 500
                  ? '서버에 알 수 없는 에러가 발생했습니다.'
                  : error.message
              }}
            </h1>
            <v-btn class="mx-1 my-5" @click="goToHome">
              <v-icon>mdi-home</v-icon>
              <v-icon class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    message: string
    fatal: boolean
  }
}>()
onMounted(() => {
  console.log(props.error)
})

const router = useRouter()
const goToHome = () => {
  router.push('/')
}
</script>
