// vite.config.js
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__vite_injected_original_dirname, "index.html"),
        about: resolve(__vite_injected_original_dirname, "about.html"),
        contact: resolve(__vite_injected_original_dirname, "contact.html")
      }
    }
  },
  // Ensure assets are properly handled
  assetsInclude: ["**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.svg", "**/*.gif", "**/*.webp"],
  // Configure public directory
  publicDir: "public"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgbWFpbjogcmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC5odG1sJyksXG4gICAgICAgIGFib3V0OiByZXNvbHZlKF9fZGlybmFtZSwgJ2Fib3V0Lmh0bWwnKSxcbiAgICAgICAgY29udGFjdDogcmVzb2x2ZShfX2Rpcm5hbWUsICdjb250YWN0Lmh0bWwnKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy8gRW5zdXJlIGFzc2V0cyBhcmUgcHJvcGVybHkgaGFuZGxlZFxuICBhc3NldHNJbmNsdWRlOiBbJyoqLyouanBnJywgJyoqLyouanBlZycsICcqKi8qLnBuZycsICcqKi8qLnN2ZycsICcqKi8qLmdpZicsICcqKi8qLndlYnAnXSxcbiAgLy8gQ29uZmlndXJlIHB1YmxpYyBkaXJlY3RvcnlcbiAgcHVibGljRGlyOiAncHVibGljJ1xufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLFNBQVMsZUFBZTtBQUR4QixJQUFNLG1DQUFtQztBQUd6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxNQUFNLFFBQVEsa0NBQVcsWUFBWTtBQUFBLFFBQ3JDLE9BQU8sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsUUFDdEMsU0FBUyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUM1QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLGVBQWUsQ0FBQyxZQUFZLGFBQWEsWUFBWSxZQUFZLFlBQVksV0FBVztBQUFBO0FBQUEsRUFFeEYsV0FBVztBQUNiLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
