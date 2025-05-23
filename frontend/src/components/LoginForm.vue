<script setup lang="ts">
import { ref } from 'vue'
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
    usernameLabel?: string
    passwordLabel?: string
  }>(),
  {
    title: 'Log in',
    submitButtonText: 'Log in',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
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
          :label="usernameLabel"
          :rules="[(v) => !!v || 'Username is required']"
          persistent-placeholder
          autofocus
        />
        <VTextField
          v-model="password"
          :label="passwordLabel"
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
