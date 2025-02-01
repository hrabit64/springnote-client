<template>
  <v-layout class="rounded rounded-md px-0 main-font bg-success">
    <v-main class="d-flex align-center justify-center bg-success">
      <slot></slot>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts"></script>

<style>
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
