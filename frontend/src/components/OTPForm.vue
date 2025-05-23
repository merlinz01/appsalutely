<script setup lang="ts">
import { computed, watch } from 'vue'
import { VBtn, VCard, VCardText, VForm, VOtpInput } from 'vuetify/components'

const otp = defineModel<string>('otp', { default: '' })
const emit = defineEmits<{
  submit: [string]
}>()
const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    submitButtonText?: string
    minWidth?: string | number
    maxWidth?: string | number
    loading?: boolean
    length?: number
    autosubmit?: boolean
  }>(),
  {
    title: '2FA Verification',
    subtitle: 'Enter the code from your authenticator app',
    submitButtonText: 'Verify',
    length: 6,
    autosubmit: true,
  },
)
const valid = computed(() => otp.value.length === props.length)

watch(otp, () => {
  if (props.autosubmit && otp.value.length === props.length) {
    emit('submit', otp.value)
  }
})
</script>
<template>
  <VCard :title="title" :subtitle="subtitle" :min-width="minWidth" :max-width="maxWidth">
    <VForm @submit.prevent="emit('submit', otp)" :model-value="valid">
      <VCardText class="d-flex flex-column">
        <VOtpInput v-model="otp" label="OTP" persistent-placeholder autofocus :length="length" />
        <VBtn
          :disabled="!valid"
          type="submit"
          color="primary"
          variant="flat"
          :text="submitButtonText"
          :loading="loading"
          class="align-self-center"
        />
        <slot name="beneath" />
      </VCardText>
    </VForm>
  </VCard>
</template>
