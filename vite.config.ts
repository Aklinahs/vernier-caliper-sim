import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import imagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 90,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  base: '/vernier-caliper-sim/', // Add this line - must match your repository name
  server: {
    port: 5173
  },
  optimizeDeps: {
    exclude: ['@images'] // Exclude image optimization during dev
  },
  build: {
    assetsInlineLimit: 0, // Prevent image inlining
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]' // Preserve original filenames
      }
    }
  }
})