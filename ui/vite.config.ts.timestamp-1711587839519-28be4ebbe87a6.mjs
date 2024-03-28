// vite.config.ts
import { defineConfig } from "file:///Users/zebang.eth/Desktop/CS%20590/projects/assignment5-zl411/ui/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/zebang.eth/Desktop/CS%20590/projects/assignment5-zl411/ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      vue: "@vue/compat"
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2
          }
        }
      }
    })
  ],
  server: {
    port: 8130,
    proxy: {
      "^/api": {
        target: "http://127.0.0.1:8131"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemViYW5nLmV0aC9EZXNrdG9wL0NTIDU5MC9wcm9qZWN0cy9hc3NpZ25tZW50NS16bDQxMS91aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3plYmFuZy5ldGgvRGVza3RvcC9DUyA1OTAvcHJvamVjdHMvYXNzaWdubWVudDUtemw0MTEvdWkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3plYmFuZy5ldGgvRGVza3RvcC9DUyUyMDU5MC9wcm9qZWN0cy9hc3NpZ25tZW50NS16bDQxMS91aS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgdnVlOiAnQHZ1ZS9jb21wYXQnLFxuICAgIH1cbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSh7XG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICBjb21wYXRDb25maWc6IHtcbiAgICAgICAgICAgIE1PREU6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSxcbiAgXSxcblxuXHRzZXJ2ZXI6IHtcblx0XHRwb3J0OiA4MTMwLFxuXHRcdHByb3h5OiB7XG5cdFx0XHRcIl4vYXBpXCI6IHtcblx0XHRcdFx0dGFyZ2V0OiBcImh0dHA6Ly8xMjcuMC4wLjE6ODEzMVwiXG5cdFx0XHR9LFxuICAgIH1cblx0fSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThXLFNBQVMsb0JBQW9CO0FBQzNZLE9BQU8sU0FBUztBQUdoQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxRQUNSLGlCQUFpQjtBQUFBLFVBQ2YsY0FBYztBQUFBLFlBQ1osTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVELFFBQVE7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNOLFNBQVM7QUFBQSxRQUNSLFFBQVE7QUFBQSxNQUNUO0FBQUEsSUFDQztBQUFBLEVBQ0g7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
