import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Base relativa: funciona en Vercel (raíz) y en GitHub Pages (/PSICOFRAN/)
  base: './',
  plugins: [react(), tailwindcss()],
})
