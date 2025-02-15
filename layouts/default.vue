<template>
  <v-app class="main-font bg-success">
    <MainAppBar />
    <SideBar />


    <v-main style="padding-top: 64px;">
      <slot></slot>

      <MainFooter />
    </v-main>


  </v-app>
  <client-only>
    <AlertSnackBar />
  </client-only>

  <client-only>
    <LoginManager />
  </client-only>
</template>
<script setup lang="ts">
import MainFooter from '~/components/MainFooter.vue'
</script>

<style>

.v-main {

}

.main-font {
  font-family: 'JetBrains Mono', 'D2Coding', monospace !important;
  color: #E0E0E0;
}

/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #222222;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(55, 55, 55);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}


</style>
<style scoped></style>
