<template>
  <!--  need border-->
  <v-card :width="w" elevation="0" height="100%" variant="outlined" class="content-card bg-success">
    <v-card-title class="text-right py-0 my-0 bg-accent">
      <v-row>
        <v-col cols="8">
          <p class="py-2 text-left bold-font text-body-2 text-primary title-overflow">
            <slot name="title">{{ title }}</slot>
          </p>
        </v-col>
        <v-col cols="4">
          <v-btn
            class="mx-2"
            icon="mdi-minus"
            variant="text"
            density="compact"
            size="x-small"
            @click.stop="minus"
          ></v-btn>

          <v-btn
            class="mx-2"
            icon="mdi-checkbox-blank-outline"
            variant="text"
            density="compact"
            size="x-small"
            @click.stop="split"
          ></v-btn>

          <v-btn
            class="ml-2"
            icon="mdi-close"
            variant="text"
            density="compact"
            size="x-small"
            @click.stop="close"
          ></v-btn>
        </v-col>
      </v-row>

    </v-card-title>
    <v-divider></v-divider>

    <slot></slot>


  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps<{
  w: string,

  //not required
  noBackground?: boolean,

  cardType?: string,
}>()

const cardStyle = computed(() => {
  return {
    backgroundColor: props.noBackground ? 'transparent' : 'white'
  }
})

const emit = defineEmits(['close', 'minus', 'split'])

const close = () => {
  emit('close')
}

const minus = () => {
  emit('minus')
}

const split = () => {
  emit('split')
}
</script>

<style>
/* overflow text ellipsis */
.title-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.content-card {

  border: 2px solid #1E1E1E !important;
}

</style>
