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
    open: true,
    hmr: {
      host: 'localhost',
      port: 3456
    },
  },
  // 优化开发体验
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})