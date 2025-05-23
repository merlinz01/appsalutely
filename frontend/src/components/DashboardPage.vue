<script setup lang="ts">
import { VBreadcrumbs, VContainer } from 'vuetify/components'

withDefaults(
  defineProps<{
    breadcrumbs?: VBreadcrumbs['$props']['items']
    fluid?: boolean
  }>(),
  {
    fluid: true,
  },
)
</script>
<template>
  <VContainer :fluid="fluid" class="h-100 d-flex flex-column py-0 h-100">
    <VBreadcrumbs
      :items="breadcrumbs"
      density="comfortable"
      class="pa-0 flex-wrap"
      v-if="breadcrumbs"
    />
    <slot />
  </VContainer>
</template>
