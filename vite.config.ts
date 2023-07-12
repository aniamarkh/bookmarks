import { fileURLToPath, URL } from "node:url";
import path from "path";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    setupFiles: ["vitest-localstorage-mock"],
    mockReset: false,
    coverage: {
      all: true,
    },
  },
});
