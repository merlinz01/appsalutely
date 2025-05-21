import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface NotifyMessage {
  id?: string
  text: string
  type?: 'info' | 'success' | 'warning' | 'error'
  timeout?: number
}

export default defineStore('notify', () => {
  const messages = ref<NotifyMessage[]>([])
  const timeouts = ref<Record<string, number>>({})
  function add(message: NotifyMessage) {
    if (!message.id) {
      message.id = new Date().getTime().toString()
    } else {
      remove(message.id)
    }
    if (message.timeout === undefined) {
      message.timeout = 5000
    }
    messages.value.push(message)
    if (message.timeout) {
      timeouts.value[message.id] = setTimeout(() => {
        remove(message.id!)
      }, message.timeout)
    }
    return message.id!
  }
  function remove(id: string) {
    messages.value = messages.value.filter((message) => message.id !== id)
    if (timeouts.value[id]) {
      clearTimeout(timeouts.value[id])
      delete timeouts.value[id]
    }
  }
  function info(text: string) {
    return add({ text, type: 'info' })
  }
  function success(text: string) {
    return add({ text, type: 'success' })
  }
  function warning(text: string) {
    return add({ text, type: 'warning' })
  }
  function error(text: string) {
    return add({ text, type: 'error' })
  }
  return { messages, add, remove, info, success, warning, error }
})
