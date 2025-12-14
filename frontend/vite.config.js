import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/lab4',
  plugins: [react()],
  build: {
    outDir: '../backend/src/main/webapp/static',
    emptyOutDir: true
  },
})
