import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // CI sets VITE_BASE=/star-space-portfolio/ for GitHub Pages.
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 4173,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
