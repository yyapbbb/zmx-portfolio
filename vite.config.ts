import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  assetsInclude: ['**/*.glb'],
  preview: {
    host: '0.0.0.0',
    port: 80,
    allowedHosts: ['zmx.com', '.trycloudflare.com', '.loca.lt'],
  },
})
