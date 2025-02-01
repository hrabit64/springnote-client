<template>
  <v-col cols="12" class="mx-0 px-0">
    <v-card elevation="0" witdh="100%">
      <v-card-title class="text-right py-0 my-0">
        <v-row>
          <v-col cols="6">
            <p class="py-2 text-left bold-font text-body-2 text-primary">
              {{ language }}
            </p>
          </v-col>
          <v-col cols="6">
            <v-btn
              class="ml-2"
              icon="mdi-content-copy"
              variant="text"
              density="compact"
              size="x-small"
              @click.stop="copyText"
            ></v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-item class="py-2 ma-0 bold-font text-body-1">
        <pre :class="$props.class" ref="codeContent"><slot /></pre>
      </v-card-item>
    </v-card>
  </v-col>
</template>

<style scoped>
.main-font {
  font-family: 'JetBrains Mono', 'D2Coding', monospace !important;
}
pre {
  overflow-x: scroll;

  /* width */
  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
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
}
</style>
<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})
const codeContent = ref<HTMLElement | null>(null)
const { copy } = useClipboard()
const copyShow = ref(false)
const copyText = () => {
  if (codeContent.value) {
    copy(codeContent.value.textContent || '')
    copyShow.value = true
  }
}
</script>
