import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('colorMode', () => {
  const mode = ref<'light' | 'dark'>(localStorage.getItem('colorMode') == 'dark' ? 'dark' : 'light')
  function toggle() {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }
  function update(newMode: 'light' | 'dark') {
    localStorage.setItem('colorMode', newMode)
    document.documentElement.setAttribute('data-theme', newMode)
  }
  watch(mode, (newMode) => update(newMode))
  update(mode.value)
  return { mode, toggle }
})
