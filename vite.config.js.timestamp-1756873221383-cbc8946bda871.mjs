// vite.config.js
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  base: "/",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6ICcvJyxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICBtYWluOiByZXNvbHZlKF9fZGlybmFtZSwgJ2luZGV4Lmh0bWwnKSxcbiAgICAgICAgYWJvdXQ6IHJlc29sdmUoX19kaXJuYW1lLCAnYWJvdXQuaHRtbCcpLFxuICAgICAgICBjb250YWN0OiByZXNvbHZlKF9fZGlybmFtZSwgJ2NvbnRhY3QuaHRtbCcpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBFbnN1cmUgYXNzZXRzIGFyZSBwcm9wZXJseSBoYW5kbGVkXG4gIGFzc2V0c0luY2x1ZGU6IFsnKiovKi5qcGcnLCAnKiovKi5qcGVnJywgJyoqLyoucG5nJywgJyoqLyouc3ZnJywgJyoqLyouZ2lmJywgJyoqLyoud2VicCddLFxuICAvLyBDb25maWd1cmUgcHVibGljIGRpcmVjdG9yeVxuICBwdWJsaWNEaXI6ICdwdWJsaWMnXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsU0FBUyxlQUFlO0FBRHhCLElBQU0sbUNBQW1DO0FBR3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLE1BQU0sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsUUFDckMsT0FBTyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUN0QyxTQUFTLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQzVDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsZUFBZSxDQUFDLFlBQVksYUFBYSxZQUFZLFlBQVksWUFBWSxXQUFXO0FBQUE7QUFBQSxFQUV4RixXQUFXO0FBQ2IsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
