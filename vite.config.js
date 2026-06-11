import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Ruta base del repositorio en GitHub Pages
  base: '/PSICOFRAN/',
  plugins: [react(), tailwindcss()],
})
