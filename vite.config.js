import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/wp-json": {
        target: "https://service-manager-wp.infinityfree.me",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
})
