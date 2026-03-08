import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        brandDesign: resolve(__dirname, 'brand-design.html'),
        eventmarketing: resolve(__dirname, 'event-marketing.html'),
        photography: resolve(__dirname, 'photography.html'),
        webDevelopment: resolve(__dirname, 'web-development.html'),
        corporateShots: resolve(__dirname, 'corporate-shots.html'),
        eventShoots: resolve(__dirname, 'event-shoots.html'),
        graduation: resolve(__dirname, 'graduation.html'),
        productShoot: resolve(__dirname, 'product-shoot.html'),
        portraits: resolve(__dirname, 'portraits.html'),
        advertising: resolve(__dirname, 'advertising.html'),
        marketing: resolve(__dirname, 'marketing.html'),
        events: resolve(__dirname, 'events.html'),
        commercial: resolve(__dirname, 'commercial.html'),
        lifestyle: resolve(__dirname, 'lifestyle.html'),
      }
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.gif', '**/*.webp'],
  publicDir: 'public'
})
