import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://136.113.62.112',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api'),
      }
    }
  }
})
