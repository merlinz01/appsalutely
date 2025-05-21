import { defineConfig, type UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

const config: UserConfig = {
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'appsalutely',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'pinia', 'vuetify', 'vuetify/components'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          pinia: 'Pinia',
          vuetify: 'Vuetify',
          'vuetify/components': 'VuetifyComponents',
        },
      },
    },
  },
  plugins: [Vue()],
}
export default defineConfig(config)
