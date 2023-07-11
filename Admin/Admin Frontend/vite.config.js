import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/products': 'http://localhost:8081',
      '/brands': 'http://localhost:8081',
      '/categories': 'http://localhost:8081',
      '/user': 'http://localhost:8081',
      '/auth': 'http://localhost:8081',
      '/cart': 'http://localhost:8081',
      '/orders': 'http://localhost:8081',
      '/auth/reset-password': 'http://localhost:8081',
      '/auth/signout': 'http://localhost:8081',
      '/categories/delete/': 'http://localhost:8081',
    }
  },
  plugins: [react()],
})
