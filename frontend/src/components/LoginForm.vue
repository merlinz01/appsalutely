<script setup lang="ts">
import { defineProps, withDefaults, defineModel, defineEmits, ref } from 'vue'
import { VBtn, VCard, VCardText, VForm, VTextField } from 'vuetify/components'

const username = defineModel<string>('username', { default: '' })
const password = defineModel<string>('password', { default: '' })
const emit = defineEmits<{
  submit: [string, string]
}>()
withDefaults(
  defineProps<{
    title?: string
    submitButtonText?: string
    minWidth?: string | number
    maxWidth?: string | number
    loading?: boolean
  }>(),
  {
    title: 'Login',
    submitButtonText: 'Login',
  },
)
const valid = ref(false)
</script>
<template>
  <VCard :title="title" :min-width="minWidth" :max-width="maxWidth">
    <VForm @submit.prevent="emit('submit', username, password)" v-model="valid">
      <VCardText>
        <VTextField
          v-model="username"
          label="Username"
          :rules="[(v) => !!v || 'Username is required']"
          persistent-placeholder
          autofocus
        />
        <VTextField
          v-model="password"
          label="Password"
          type="password"
          :rules="[(v) => !!v || 'Password is required']"
          persistent-placeholder
        />
        <div class="d-flex justify-center">
          <VBtn
            :disabled="!valid"
            type="submit"
            color="primary"
            variant="flat"
            :text="submitButtonText"
            :loading="loading"
          />
        </div>
      </VCardText>
    </VForm>
  </VCard>
</template>
