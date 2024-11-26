import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        },
        {
          src: 'src/assets/images',
          dest: './assets/',
        }
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@ui": path.resolve(__dirname, "/src/components/ui"),
      "@layout": path.resolve(__dirname, "/src/components/layout"),
      "@providers": path.resolve(__dirname, "/src/providers"),
      "@lib": path.resolve(__dirname, "/src/lib"),
      "@services": path.resolve(__dirname, "/src/services"),
    },
  },
})