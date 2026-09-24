import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const healthEndpoint = () => ({
  name: "health-endpoint",
  configureServer(server) {
    server.middlewares.use("/api/health", (request, response) => {
      if (request.method !== "GET") {
        response.statusCode = 405;
        response.setHeader("Allow", "GET");
        response.end();
        return;
      }

      response.setHeader("Content-Type", "application/json");
      response.end(
        JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }),
      );
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use("/api/health", (request, response) => {
      if (request.method !== "GET") {
        response.statusCode = 405;
        response.setHeader("Allow", "GET");
        response.end();
        return;
      }

      response.setHeader("Content-Type", "application/json");
      response.end(
        JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }),
      );
    });
  },
});

export default defineConfig({
  plugins: [react(), healthEndpoint()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
    exclude: ["**/e2e/**", "**/node_modules/**", "**/dist/**"],
  },
});
