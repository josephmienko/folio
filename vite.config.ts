// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    base: "/",  // Ensure it serves from root, no unwanted paths
    plugins: [react()],
    define: {
      "process.env": env,
    },
    server: {
      strictPort: false,
      hmr: true,
      port: 3000,
      open: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
        "@pages": path.resolve(__dirname, "./src/pages"),
      },
    },        
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./vitest.setup.ts",
      coverage: {
        provider: "v8", // Use c8 for coverage
        reporter: ["text", "html"], // Outputs results in text & HTML
        all: true, // Includes files without tests
        exclude: ["node_modules", "dist", "vite.config.ts"],
      },
    }
  };
});
