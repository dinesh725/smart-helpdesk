import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Allow external connections
    proxy: {
      "/api": {
        target: "http://server:8080",
        changeOrigin: true,
        secure: false, // Allow non-HTTPS connections
        rewrite: (path) => path, // Ensure path is preserved
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
})
