<template>
  <v-app class="main-font bg-success">
    <MainAppBar />
    <SideBar />
    <client-only>
      <LoginManager />
    </client-only>
    <v-main>

      <slot></slot>
    </v-main>
  </v-app>
  <client-only>
    <AlertSnackBar />
  </client-only>
</template>
<script setup lang="ts">
</script>

<style>
.v-main {
  padding-top: 64px;
}


.main-font {
  font-family: 'JetBrains Mono', 'D2Coding', monospace !important;
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
