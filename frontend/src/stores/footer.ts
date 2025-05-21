import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface FooterMessage {
  id?: string
  text: string
  type?: 'info' | 'success' | 'warning' | 'error'
  timeout?: number
  actions?: {
    [key: string]: () => void
  }
}

export default defineStore('footer', () => {
  const messages = ref<FooterMessage[]>([])
  const current = computed(() => {
    if (messages.value.length > 0) {
      return messages.value[messages.value.length - 1]
    }
    return null
  })
  function addMessage(message: FooterMessage) {
    if (!message.id) {
      message.id = new Date().getTime().toString()
    }
    if (message.timeout === undefined) {
      message.timeout = 5000
    }
    messages.value.push(message)
    if (message.timeout) {
      setTimeout(() => {
        removeMessage(message.id!)
      }, message.timeout)
    }
    return message.id!
  }
  function removeMessage(id: string) {
    messages.value = messages.value.filter((message) => message.id !== id)
  }
  return { messages, current, addMessage, removeMessage }
})
