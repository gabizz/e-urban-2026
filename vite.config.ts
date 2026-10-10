import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/uat': {
        target: 'https://primarii.registro.ro',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
