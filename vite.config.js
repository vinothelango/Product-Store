import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',     // <-- Required for Render
    port: process.env.PORT || 3000, // <-- Render sets PORT env var
  },
})
