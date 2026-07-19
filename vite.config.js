import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Allow tunnels / public hosts (localtunnel, cloudflared, etc.)
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 1200,
  },
});