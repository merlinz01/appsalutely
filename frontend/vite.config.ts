import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import path from 'path'

// https://vite.dev/config/
// https://vite.dev/guide/build.html#library-mode
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'appsalutely',
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
})
