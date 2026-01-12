// vite.config.js
import { defineConfig } from "file:///C:/Users/LENOVO/Desktop/Work/Website/Redpen%20comms/codebase/websiteeee/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import tailwindcss from "file:///C:/Users/LENOVO/Desktop/Work/Website/Redpen%20comms/codebase/websiteeee/node_modules/@tailwindcss/vite/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\LENOVO\\Desktop\\Work\\Website\\Redpen comms\\codebase\\websiteeee";
var vite_config_default = defineConfig({
  base: "/",
  plugins: [
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__vite_injected_original_dirname, "index.html"),
        about: resolve(__vite_injected_original_dirname, "about.html"),
        contact: resolve(__vite_injected_original_dirname, "contact.html"),
        brandDesign: resolve(__vite_injected_original_dirname, "brand-design.html"),
        eventmarketing: resolve(__vite_injected_original_dirname, "event-marketing.html"),
        photography: resolve(__vite_injected_original_dirname, "photography.html")
      }
    }
  },
  assetsInclude: ["**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.svg", "**/*.gif", "**/*.webp"],
  publicDir: "public"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMRU5PVk9cXFxcRGVza3RvcFxcXFxXb3JrXFxcXFdlYnNpdGVcXFxcUmVkcGVuIGNvbW1zXFxcXGNvZGViYXNlXFxcXHdlYnNpdGVlZWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXExFTk9WT1xcXFxEZXNrdG9wXFxcXFdvcmtcXFxcV2Vic2l0ZVxcXFxSZWRwZW4gY29tbXNcXFxcY29kZWJhc2VcXFxcd2Vic2l0ZWVlZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTEVOT1ZPL0Rlc2t0b3AvV29yay9XZWJzaXRlL1JlZHBlbiUyMGNvbW1zL2NvZGViYXNlL3dlYnNpdGVlZWUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBiYXNlOiAnLycsXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdGFpbHdpbmRjc3MoKSxcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgbWFpbjogcmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC5odG1sJyksXHJcbiAgICAgICAgYWJvdXQ6IHJlc29sdmUoX19kaXJuYW1lLCAnYWJvdXQuaHRtbCcpLFxyXG4gICAgICAgIGNvbnRhY3Q6IHJlc29sdmUoX19kaXJuYW1lLCAnY29udGFjdC5odG1sJyksXHJcbiAgICAgICAgYnJhbmREZXNpZ246IHJlc29sdmUoX19kaXJuYW1lLCAnYnJhbmQtZGVzaWduLmh0bWwnKSxcclxuICAgICAgICBldmVudG1hcmtldGluZzogcmVzb2x2ZShfX2Rpcm5hbWUsICdldmVudC1tYXJrZXRpbmcuaHRtbCcpLFxyXG4gICAgICAgIHBob3RvZ3JhcGh5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3Bob3RvZ3JhcGh5Lmh0bWwnKVxyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXNzZXRzSW5jbHVkZTogWycqKi8qLmpwZycsICcqKi8qLmpwZWcnLCAnKiovKi5wbmcnLCAnKiovKi5zdmcnLCAnKiovKi5naWYnLCAnKiovKi53ZWJwJ10sXHJcbiAgcHVibGljRGlyOiAncHVibGljJ1xyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFaLFNBQVMsb0JBQW9CO0FBQ2xiLFNBQVMsZUFBZTtBQUN4QixPQUFPLGlCQUFpQjtBQUZ4QixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsTUFBTSxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUNyQyxPQUFPLFFBQVEsa0NBQVcsWUFBWTtBQUFBLFFBQ3RDLFNBQVMsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDMUMsYUFBYSxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBLFFBQ25ELGdCQUFnQixRQUFRLGtDQUFXLHNCQUFzQjtBQUFBLFFBQ3pELGFBQWEsUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUVwRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxlQUFlLENBQUMsWUFBWSxhQUFhLFlBQVksWUFBWSxZQUFZLFdBQVc7QUFBQSxFQUN4RixXQUFXO0FBQ2IsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
