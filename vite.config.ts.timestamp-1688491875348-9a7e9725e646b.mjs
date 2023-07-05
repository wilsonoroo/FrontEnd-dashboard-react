// vite.config.ts
import react from "file:///Users/javiermalebran/Documents/vaku/vaku-adminv2/vaku-final/vaku-admin/node_modules/.pnpm/@vitejs+plugin-react@4.0.0_vite@4.3.2/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///Users/javiermalebran/Documents/vaku/vaku-adminv2/vaku-final/vaku-admin/node_modules/.pnpm/vite@4.3.2_sass@1.58.3/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/Users/javiermalebran/Documents/vaku/vaku-adminv2/vaku-final/vaku-admin";
var vite_config_default = defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx"
      }
    }
  },
  define: {
    "process.env": process.env
  },
  resolve: {
    extensions: [
      ".mjs",
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
      ".vue",
      ".scss"
    ],
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
      "@services": path.resolve(__vite_injected_original_dirname, "./src/services"),
      "@model": path.resolve(__vite_injected_original_dirname, "./src/model"),
      "@contexts": path.resolve(__vite_injected_original_dirname, "./src/contexts"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@layouts": path.resolve(__vite_injected_original_dirname, "./src/layouts"),
      "@routes": path.resolve(__vite_injected_original_dirname, "./src/routes"),
      "@theme": path.resolve(__vite_injected_original_dirname, "./src/theme"),
      "@pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
      "@navigation": path.resolve(__vite_injected_original_dirname, "./src/navigation"),
      "@repositories": path.resolve(__vite_injected_original_dirname, "./src/repositories")
    }
  },
  plugins: [react()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamF2aWVybWFsZWJyYW4vRG9jdW1lbnRzL3Zha3UvdmFrdS1hZG1pbnYyL3Zha3UtZmluYWwvdmFrdS1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2phdmllcm1hbGVicmFuL0RvY3VtZW50cy92YWt1L3Zha3UtYWRtaW52Mi92YWt1LWZpbmFsL3Zha3UtYWRtaW4vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2phdmllcm1hbGVicmFuL0RvY3VtZW50cy92YWt1L3Zha3UtYWRtaW52Mi92YWt1LWZpbmFsL3Zha3UtYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgbG9hZGVyOiB7XG4gICAgICAgIFwiLmpzXCI6IFwianN4XCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgIFwicHJvY2Vzcy5lbnZcIjogcHJvY2Vzcy5lbnYsXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBleHRlbnNpb25zOiBbXG4gICAgICBcIi5tanNcIixcbiAgICAgIFwiLmpzXCIsXG4gICAgICBcIi50c1wiLFxuICAgICAgXCIuanN4XCIsXG4gICAgICBcIi50c3hcIixcbiAgICAgIFwiLmpzb25cIixcbiAgICAgIFwiLnZ1ZVwiLFxuICAgICAgXCIuc2Nzc1wiLFxuICAgIF0sXG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgXCJAYXNzZXRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvYXNzZXRzXCIpLFxuICAgICAgXCJAY29tcG9uZW50c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2NvbXBvbmVudHNcIiksXG4gICAgICBcIkBzZXJ2aWNlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3NlcnZpY2VzXCIpLFxuICAgICAgXCJAbW9kZWxcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9tb2RlbFwiKSxcbiAgICAgIFwiQGNvbnRleHRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvY29udGV4dHNcIiksXG4gICAgICBcIkBob29rc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2hvb2tzXCIpLFxuICAgICAgXCJAbGF5b3V0c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2xheW91dHNcIiksXG4gICAgICBcIkByb3V0ZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9yb3V0ZXNcIiksXG4gICAgICBcIkB0aGVtZVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3RoZW1lXCIpLFxuICAgICAgXCJAcGFnZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9wYWdlc1wiKSxcbiAgICAgIFwiQG5hdmlnYXRpb25cIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9uYXZpZ2F0aW9uXCIpLFxuICAgICAgXCJAcmVwb3NpdG9yaWVzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvcmVwb3NpdG9yaWVzXCIpLFxuICAgIH0sXG4gIH0sXG5cbiAgcGx1Z2luczogW3JlYWN0KCldLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVZLE9BQU8sV0FBVztBQUN6WixPQUFPLFVBQVU7QUFDakIsU0FBUyxvQkFBb0I7QUFGN0IsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsY0FBYztBQUFBLElBQ1osZ0JBQWdCO0FBQUEsTUFDZCxRQUFRO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlLFFBQVE7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsWUFBWTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLFdBQVcsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUNqRCxlQUFlLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUN6RCxhQUFhLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUNyRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsYUFBYSxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDckQsVUFBVSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQy9DLFlBQVksS0FBSyxRQUFRLGtDQUFXLGVBQWU7QUFBQSxNQUNuRCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDakQsVUFBVSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQy9DLFVBQVUsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUMvQyxlQUFlLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUN6RCxpQkFBaUIsS0FBSyxRQUFRLGtDQUFXLG9CQUFvQjtBQUFBLElBQy9EO0FBQUEsRUFDRjtBQUFBLEVBRUEsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUNuQixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
