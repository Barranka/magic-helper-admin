import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/magic-helper-admin/', // важно для GitHub Pages
  build: {
    outDir: 'docs', // или 'dist', если используешь root
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html',
    },
  },
});
