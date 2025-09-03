// vite.config.js
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  base: "/",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6ICcvJyxcbiAgYmFzZTogJy8nLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1haW46IHJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpLFxuICAgICAgICBhYm91dDogcmVzb2x2ZShfX2Rpcm5hbWUsICdhYm91dC5odG1sJyksXG4gICAgICAgIGNvbnRhY3Q6IHJlc29sdmUoX19kaXJuYW1lLCAnY29udGFjdC5odG1sJylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vIEVuc3VyZSBhc3NldHMgYXJlIHByb3Blcmx5IGhhbmRsZWRcbiAgYXNzZXRzSW5jbHVkZTogWycqKi8qLmpwZycsICcqKi8qLmpwZWcnLCAnKiovKi5wbmcnLCAnKiovKi5zdmcnLCAnKiovKi5naWYnLCAnKiovKi53ZWJwJ10sXG4gIC8vIENvbmZpZ3VyZSBwdWJsaWMgZGlyZWN0b3J5XG4gIHB1YmxpY0RpcjogJ3B1YmxpYydcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxTQUFTLGVBQWU7QUFEeEIsSUFBTSxtQ0FBbUM7QUFHekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsTUFBTSxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUNyQyxPQUFPLFFBQVEsa0NBQVcsWUFBWTtBQUFBLFFBQ3RDLFNBQVMsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDNUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxlQUFlLENBQUMsWUFBWSxhQUFhLFlBQVksWUFBWSxZQUFZLFdBQVc7QUFBQTtBQUFBLEVBRXhGLFdBQVc7QUFDYixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
