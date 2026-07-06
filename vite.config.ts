import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Load env variables from system env and .env files
  const env = loadEnv(mode, process.cwd(), '');
  const rawBase = env.VITE_APP_BASE || '/';

  // Format base to ensure it starts and ends with a slash (Vite requirement)
  const base = rawBase === '/' ? '/' : (rawBase.endsWith('/') ? rawBase : `${rawBase}/`);
  const formattedBase = base.startsWith('/') ? base : `/${base}`;

  // Automatically determine output directory (e.g. dist/rpd for /rpd/)
  const dirSuffix = formattedBase.replace(/^\/+|\/+$/g, '');
  const outDir = dirSuffix ? `dist/${dirSuffix}` : 'dist';

  return {
    base: formattedBase,
    build: {
      outDir,
    },
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
      host: true,         // allow external access on network
    },
  };
});
