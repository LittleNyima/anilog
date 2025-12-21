import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import fs from "node:fs";
import yaml from "yaml";

// Load config from yaml
function loadConfig() {
  const configPath = path.resolve(__dirname, "config.yaml");
  const configContent = fs.readFileSync(configPath, "utf-8");
  return yaml.parse(configContent);
}

const config = loadConfig();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Custom plugin to inject config into HTML
    {
      name: "html-config-inject",
      transformIndexHtml(html) {
        return html.replace(/<title>.*<\/title>/, `<title>${config.title || "Anilog"}</title>`);
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __APP_CONFIG__: JSON.stringify(config),
  },
});
