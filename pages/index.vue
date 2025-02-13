<template>
  <v-container class="justify-center align-center ma-0 pa-0" width="100%">
    <v-row justify="center" align="center" class="mx-1 my-1 d-flex">
      <v-col cols="12">
        <WindowCard w="100%">
          <template v-slot:title>
            <v-icon>mdi-human-greeting</v-icon>
            Hello, Springnote.blog!
          </template>
          <v-row class="pa-5" justify="center" align="center">
            <v-col cols="12" class="justify-center align-center">
              <v-card
                color="primary"
                variant="outlined"
                class="pa-5 justify-center align-center"
                width="100%"
                style="height: 90vh"
              >
                <v-card-title class="justify-center align-center">
                  <p class="text-md-h2 text-h3 bold-font text-center">
                    <v-icon class="ml-1">mdi-human-greeting</v-icon>
                    Hello
                  </p>
                  <p
                    class="text-md-h3 text-h5 text-primary bold-font mb-5 text-white wrap-text text-center"
                  >
                    Springnote.blog!
                  </p>

                  <p
                    class="text-md-body-1 text-body-2 regular-font pt-5 text-white wrap-text text-center"
                  >
                    <b class="text-primary">springnote.blog</b> 에 오신 것을
                    환영합니다!
                  </p>
                  <p
                    class="text-md-body-1 text-body-2 regular-font text-white wrap-text text-center pt-5"
                  >
                    백엔드 개발에 대해 공부하고, 활동해온 내용들을 정리하고
                    공유하는 블로그입니다.
                  </p>
                </v-card-title>
                <v-card-actions class="justify-center">
                  <v-row
                    class="text-center pa-5"
                    justify="center"
                    align="center"
                  >
                    <v-col cols="12" md="4">
                      <v-btn
                        class="bold-font"
                        variant="outlined"
                        block
                        @click.stop="goTo('/series-list')"
                      >
                        <v-icon class="mr-1">mdi-folder-multiple</v-icon>
                        전체
                        시리즈 보기
                        <v-icon class="ml-2"
                        >mdi-arrow-right
                        </v-icon
                        >
                      </v-btn
                      >
                    </v-col
                    >
                    <v-col cols="12" md="4">
                      <v-btn
                        class="bold-font"
                        variant="outlined"
                        block
                        @click.stop="goTo('/post-list')"
                      >
                        <v-icon class="mr-1">mdi-file-document-multiple
                        </v-icon
                        >
                        전체 포스트 보기
                        <v-icon class="ml-2"
                        >mdi-arrow-right
                        </v-icon
                        >
                      </v-btn
                      >
                    </v-col
                    >

                    <v-col cols="12" justify="center" align="center">
                      <div
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
                          class="text-center"
                          max-width="300"
                          transition="false"
                        ></v-img>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </WindowCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const items = [
  {
    name: 'Spring',
    src: 'springicon.webp',
    description: 'Spring Boot, Spring Data JPA etc.'
  },
  {
    name: 'FastAPI',
    src: 'logo.webp',
    description: 'FastAPI 에 대해 공부하고 활용한 내용을 다룹니다.'
  },
  {
    name: 'Go',
    src: 'springicon.webp',
    description: 'Gin, Fiber 등 Golang을 사용한 백엔드 개발'
  },
  {
    name: 'CS',
    src: 'vueicon.webp',
    description: '그외 각종 컴퓨터 공학 지식들'
  },
  {
    name: 'ML',
    src: 'javaicon.webp',
    description: '강화학습 등 머신러닝 지식을 다룹니다.'
  }
]

const router = useRouter()
const goTo = (path: string) => {
  router.push(`${path}`)
}

import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<style scoped>
.wrap-text {
  white-space: normal; /* 기본 값으로 자동 줄바꿈을 설정 */
  word-wrap: break-word;
}
</style>
