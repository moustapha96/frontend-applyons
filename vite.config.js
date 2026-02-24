


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import tailwind from "tailwindcss";

const isProd = process.env.NODE_ENV === "production";

const pwaConfig = {
  registerType: "autoUpdate",
  devOptions: {
    enabled: !isProd, // active la PWA en dev pour tests
  },
  includeAssets: [
    "favicon.svg",
    "apple-touch-icon.png",
    "robots.txt",
    "logo-color.svg",
    "logo.png"
  ],
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff2}"],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/www\.applyons\.com\/.*\.(png|jpg|jpeg|svg|webp|ico|woff2?)$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "image-assets",
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "google-fonts-stylesheets",
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-webfonts",
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 an
          },
        },
      },
    ],
    navigateFallback: "/index.html",
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
  },
  manifest: {
    name: "ApplyOns",
    short_name: "ApplyOns",
    description: "ApplyOns facilite la soumission, la vérification et l'approbation des documents",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0A2642",
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  }
};

export default defineConfig({
  plugins: [react(), VitePWA(pwaConfig), tailwind()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["@tinymce/tinymce-react"],
  },
  server: {
    host: true,
    port: 8000,
    open: true
  },
  build: {
    outDir: "../www.applyons.com/",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: !isProd,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["antd"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: isProd,
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  define: {
    "process.env": {
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL || "http://localhost:5000/api/"),
    },
  },
});
