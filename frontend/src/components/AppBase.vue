<script setup lang="ts">
import { ref, watch, useSlots, onBeforeMount } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import {
  VApp,
  VProgressLinear,
  VAppBar,
  VNavigationDrawer,
  VList,
  VMain,
  VFooter,
  VBtn,
  VSnackbar,
} from 'vuetify/components'
import useColorMode from '../stores/colorMode'
import useFooter from '../stores/footer'
import useNotify from '../stores/notify'

const colorMode = useColorMode()
const drawerOpen = defineModel<boolean>('drawerOpen', { default: false })
const drawerDocked = ref(false)
const footer = useFooter()
const navigating = ref(false)
const navigatingTimeout = ref<number | null>(null)
const notify = useNotify()
const router = useRouter()
const slots = useSlots()

watch(drawerDocked, (newValue) => {
  localStorage.setItem('drawerDocked', String(newValue))
})

onBeforeMount(() => {
  router.beforeEach(() => {
    navigatingTimeout.value = setTimeout(() => {
      navigating.value = true
    }, 300)
  })
  router.afterEach(() => {
    if (navigatingTimeout.value) {
      clearTimeout(navigatingTimeout.value)
      navigatingTimeout.value = null
    }
    navigating.value = false
  })
  drawerDocked.value = localStorage.getItem('drawerDocked') === 'true'
  drawerOpen.value = drawerDocked.value
})
</script>
<template>
  <VApp :theme="colorMode.mode">
    <VProgressLinear
      indeterminate
      v-if="navigating"
      class="mb-n1"
      style="z-index: 100000; opacity: 0.5"
      height="1"
    />
    <VAppBar height="64">
      <slot name="header" />
    </VAppBar>
    <VMain class="bg-surface-light">
      <div class="d-flex flex-column pa-4 h-100">
        <RouterView />
      </div>
    </VMain>
    <VAppBar v-if="slots.footer" height="40" location="bottom">
      <VFooter class="py-0 w-100 d-flex align-center">
        <span
          v-if="footer.current"
          v-text="footer.current.text"
          :class="footer.current.type ? {} : { ['text-' + footer.current.type]: true }"
          style="text-overflow: ellipsis"
          class="overflow-hidden text-no-wrap"
        />
        <template v-if="footer.current && footer.current.actions">
          <VBtn
            v-for="(action, index) of Object.entries(footer.current.actions)"
            :text="action[0]"
            @click="action[1]"
            :key="index"
            density="comfortable"
            variant="tonal"
            class="mx-2 px-2 text-none"
            :color="footer.current.type"
          />
        </template>
        <div class="me-auto" />
        <slot name="footer" />
      </VFooter>
    </VAppBar>
    <VNavigationDrawer
      v-if="slots.drawer"
      v-model="drawerOpen"
      width="250"
      rail-width="58"
      :rail="drawerDocked"
      :mobile="drawerDocked ? false : undefined"
    >
      <VList class="h-100 d-flex flex-column" nav>
        <slot name="drawer" />
        <div class="flex-grow-1" />
        <VBtn
          @click="drawerDocked = !drawerDocked"
          icon="mdi-pin-outline"
          rounded="rounded"
          density="comfortable"
          :title="drawerDocked ? 'Undock sidebar' : 'Dock sidebar'"
          class="ma-1 ms-auto"
          :variant="drawerDocked ? 'tonal' : 'text'"
        />
      </VList>
    </VNavigationDrawer>
    <VSnackbar
      v-for="(message, index) of notify.messages"
      :key="index"
      :model-value="true"
      :text="message.text"
      :color="message.type"
      location="bottom end"
      :style="{ bottom: `${index * 56}px` }"
      :timeout="-1"
    >
      <template #actions>
        <VBtn icon="mdi-close" @click="notify.remove(message.id!)" />
      </template>
    </VSnackbar>
  </VApp>
</template>
<style>
html {
  overflow: auto;
}
html[data-theme='dark'] {
  color-scheme: dark;
}
html[data-theme='light'] {
  color-scheme: light;
}
</style>
