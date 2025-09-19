import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        brandDesign: resolve(__dirname, 'brand-design.html'),
        eventmarketing: resolve(__dirname, 'event-marketing.html'),
        photography: resolve(__dirname, photography.html')
                             
      }
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.gif', '**/*.webp'],
  publicDir: 'public'
})
