import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react']
        }
      }
    },
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react']
  },
  
  server: {
    port: 5173,
    host: true
  },
  
  preview: {
    port: 4173,
    host: true
  }
});
