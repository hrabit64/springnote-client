<template>
  <v-navigation-drawer
    style="transition: none"
    v-model="open"
    color="success"
    temporary
    fixed
    app
  >
    <v-list weight="100%">
      <!--      <v-list-subheader>FOLDERS</v-list-subheader>-->
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
        :active="router.currentRoute.value.path === item.link"
        @click.stop="goTo(item.link)"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title
          v-text="item.title"

        ></v-list-item-title>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { useSidebarStore } from '~/stores/sidebar'

interface SideBarItem {
  title: string
  link: string
  icon: string
}

const items = ref<SideBarItem[]>([
  { title: 'Home', link: '/', icon: 'mdi-folder-home' },
  { title: 'Series', link: '/series-list', icon: 'mdi-folder-multiple' },
  { title: 'Posts', link: '/post-list', icon: 'mdi-file-document-multiple' },
  { title: 'Github', link: '/github', icon: 'mdi-github' }

])


const router = useRouter()
const goTo = (link: string) => {
  if (link === '/github') {
    window.open('https://github.com/hrabit64', '_blank')
    return
  }
  router.push(link)
}

const { mobile } = useDisplay()

const sidebarStore = useSidebarStore()
const { open } = storeToRefs(sidebarStore)


</script>

<style scoped>


</style>

<style scoped>
::v-deep(.v-navigation-drawer),
::v-deep(.v-navigation-drawer--animate),
::v-deep(.v-overlay__scrim) {
  transition: none !important;
  transform: none !important;
}
</style>