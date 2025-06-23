<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { VListItem, VIcon } from 'vuetify/components'

defineProps<{
  to?: RouteLocationRaw
  href?: string
  target?: string
  icon: string
  text: string
}>()
</script>
<template>
  <VListItem role="option" :to="to" :href="href" :target="target" slim>
    <template #prepend>
      <VIcon :icon="icon" />
    </template>
    <span class="text-no-wrap overflow-hidden">{{ text }}</span>
  </VListItem>
</template>
