import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
  server: {
    port: 3456,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      clientPort: 3000
    }
  }
})