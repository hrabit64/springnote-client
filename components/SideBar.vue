<template>
  <v-navigation-drawer
    :transition="false"
    class="text-left no-transition mr-2"
    border="false"
    :permanent="!mobile"
    :temporary="mobile"
    floating
    v-model="open"
    color="success"
    :disable-resize-watcher="true"
    :mobile-break-point="3000"
    app
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
import { useSidebarStore } from '~/stores/sidebar'

interface SideBarItem {
  title: string
  link: string
  icon: string
}

const folderItems = ref<SideBarItem[]>([
  { title: 'Home', link: '/', icon: 'mdi-folder-home' },
  { title: 'Series', link: '/series-list', icon: 'mdi-folder-multiple' },
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

const { mobile } = useDisplay()

const sidebarStore = useSidebarStore()
const { open } = storeToRefs(sidebarStore)

open.value = !mobile.value

watch(mobile, () => {
  open.value = !mobile.value
})
</script>

<style scoped>


.v-navigation-drawer {
  transition: none !important;

}

.navigation-drawer-transition-duration {
  transition-duration: 0s !important;
}


.v-fade-transition-enter-active,
.v-fade-transition-leave-active,
.v-fade-transition-enter-to,
.v-fade-transition-leave-to {
  transition: none !important;
}
</style>

<style lang="sass" scoped>
$navigation-drawer-transition-property: none !important
</style>