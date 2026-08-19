import { defineConfig } from "vite";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/restcountries": {
          target: "https://api.restcountries.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/restcountries/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              const apiKey = env.VITE_RESTCOUNTRIES_API_KEY;
              if (apiKey) {
                proxyReq.setHeader("Authorization", `Bearer ${apiKey}`);
              }
            });
          },
        },
      },
    },
  };
});
