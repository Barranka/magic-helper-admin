import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.VITE_BASE_URL': JSON.stringify(process.env.VITE_BASE_URL),
  },
  base: process.env.VITE_BASE_URL || '/',
  plugins: [vue()],
})
