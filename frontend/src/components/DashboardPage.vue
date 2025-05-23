<script setup lang="ts">
import { VBreadcrumbs, VContainer } from 'vuetify/components'

withDefaults(
  defineProps<{
    breadcrumbs?: VBreadcrumbs['$props']['items']
    fluid?: boolean
    title?: string
  }>(),
  {
    fluid: true,
  },
)
</script>
<template>
  <VContainer :fluid="fluid" class="h-100 d-flex flex-column py-0 h-100">
    <VBreadcrumbs :items="breadcrumbs" density="comfortable" class="pa-0" v-if="breadcrumbs" />
    <h1 v-if="title" v-text="title" class="text-h5 font-bold ma-1" />
    <slot />
  </VContainer>
</template>
