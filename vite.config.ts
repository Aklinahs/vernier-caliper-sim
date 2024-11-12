import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/vernier-caliper-sim/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Log asset handling during build
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          console.log('Processing asset:', assetInfo.name);
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
})