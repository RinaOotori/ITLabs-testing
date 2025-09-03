import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ITLabs-testing/',
  server: {
    watch: {
      ignored: ['**/db.json'],
    },
  },
})
