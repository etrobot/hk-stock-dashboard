import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // 启用 Fast Refresh
    fastRefresh: true,
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
  server: {
    port: 3456,
    host: 'localhost',
    open: true,
    hmr: true,
  },
  // 优化开发体验
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})