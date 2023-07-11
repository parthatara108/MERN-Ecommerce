import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/products': 'http://localhost:8080',
      '/brands': 'http://localhost:8080',
      '/categories': 'http://localhost:8080',
      '/user': 'http://localhost:8080',
      '/auth': 'http://localhost:8080',
      '/cart': 'http://localhost:8080',
      '/orders': 'http://localhost:8080',
      '/auth/reset-password': 'http://localhost:8080',
      '/auth/signout': 'http://localhost:8080',
      '/create-payment-intent': 'http://localhost:8080',
      '/orders/confirm': 'http://localhost:8080',
      '/order-success': 'http://localhost:8080',
    }
  },
  plugins: [react()],
})
