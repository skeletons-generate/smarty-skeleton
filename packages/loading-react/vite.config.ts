import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "./src/index.tsx",
      name: "ReactLoaing",
      fileName: "index",
    },
    rollupOptions: {
      external: /^react|react-dom$/,
      globals: {
        "react": "React",
        "react-dom": "ReactDOM",
      },
      output: [
        {
          format: "es",
          dir: "dist",
          exports: "named",
          entryFileNames: "[name].esm.js",
          chunkFileNames: "[name].esm.js",
          // preserveModules: true, // 保留模块结构
          // preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
        },
        {
          format: "cjs",
          dir: "dist",
          exports: "named",
          entryFileNames: "[name].cjs",
          chunkFileNames: "[name].cjs",
          // preserveModules: true, // 保留模块结构
          // preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
        },
      ],
    },
    outDir: "./dist",
  },
});
