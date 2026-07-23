import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Shorthand: redirects http://localhost:5173/api to http://localhost:3000/api
      '/api': 'http://localhost:3000',
    }
  }
})
