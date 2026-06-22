import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // base: '/rpd/',
  // build: {
  //   outDir: 'dist/rpd',
  // },
  plugins: [
    tailwindcss(),
    TanStackRouterVite(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: true, // allow any host (e.g. ngrok's subdomain)
  },
});
