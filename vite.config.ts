import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/dev': 'http://localhost:3000',
      "/api": {
        target: "https://api.codecoogs.com/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/users"),
      },
    },
    port: 8080,
  },
});
