import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import adminApi from "./vite-plugins/admin-api"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), adminApi()],
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
