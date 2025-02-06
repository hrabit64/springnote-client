<template>
  <v-navigation-drawer
    class="text-left no-transition mr-2"
    border="false"
    :permanent="!mobile"
    floating
    color="success"
    v-model="open"
    temporary
  >
    <v-list weight="100%">
      <v-list-subheader>FOLDERS</v-list-subheader>
      <v-list-item
        v-for="(item, i) in folderItems"
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

      <v-list-subheader>LINKS</v-list-subheader>
      <v-list-item
        v-for="(item, i) in linkItems"
        :key="i"
        :value="item"
        color="primary"
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
interface SideBarItem {
  title: string
  link: string
  icon: string
}

const folderItems = ref<SideBarItem[]>([
  { title: 'Home', link: '/', icon: 'mdi-folder-home' },
  { title: 'Series', link: '/series-list', icon: 'mdi-folder-file' },
  { title: 'Posts', link: '/post-list', icon: 'mdi-file-document-multiple' }
  // { title: 'Projects', link: '/projects', icon: 'mdi-folder-table' },
  // { title: 'About', link: '/junser-hwang', icon: 'mdi-folder-account' }
])

const linkItems = ref<SideBarItem[]>([
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
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
import { useSidebarStore } from '~/stores/sidebar'
const sidebarStore = useSidebarStore()
const { open } = storeToRefs(sidebarStore)
open.value = !mobile.value

watch(mobile, () => {
  open.value = !mobile.value
})
</script>

<style scoped>
.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 6em;
  z-index: 2;
}
</style>
