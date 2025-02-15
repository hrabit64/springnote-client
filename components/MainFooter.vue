<template>
  <v-footer
    class="mt-5"
    color="success"

  >
    <v-row>
      <v-col
        class="text-center text-caption pt-2 "
        cols="12"
      >
        <v-spacer></v-spacer>
        <span>© {{ new Date().getFullYear() }} — <span
          class="text-primary">springnote.blog</span> All rights reserved.</span>
        <v-spacer></v-spacer>

        <p class="d-inline bold-font text-primary" style="cursor: pointer" @click.stop="goTo('/privacy-policy')">개인정보
          처리방침</p> |
        <p class="d-inline" style="cursor: pointer" @click.stop="goTo('/terms')">이용약관</p> |
        <p class="d-inline" style="cursor: pointer" @click.stop="goTo('/deactivate')">회원탈퇴</p>

        <v-spacer></v-spacer>

        <p>문의: hzser123@gmail.com</p>
        <p>본 블로그의 콘텐츠는 정보 제공 목적이며 법적 책임을 지지 않습니다.</p>
      </v-col>

    </v-row>


  </v-footer>
</template>
<script setup lang="ts">
const router = useRouter()

const goTo = (path: string) => {
  router.push(path)
}


</script>
<style scoped>

</style>