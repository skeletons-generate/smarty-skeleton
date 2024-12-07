 
import { defineConfig  } from "vite";
import buildLib from './scripts/build'

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.js",
      name: "Counter",
      fileName: "counter",
      formats: ['es', 'cjs', 'umd', 'iife']
    },
    rollupOptions: {
      external: /^react|react-dom$/,
      globals: {
        react: "React",
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
        // {
        //   format: "umd",
        //   name:"[name]",
        //   dir: "dist",
        //   exports: "named",
        //   entryFileNames: "[name].umd.js",
        //   chunkFileNames: "[name].umd.js",
        //   preserveModules: true, // 保留模块结构
        //   preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
        // },
        // {
        //   format: "iife",
        //   dir: "dist",
        //   exports: "named",
        //   name:"[name]iife",
        //   entryFileNames: "[name].iife.js",
        //   chunkFileNames: "[name].iife.js",
        //   preserveModules: true, // 保留模块结构
        //   preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
        // },
      ],
    },
    outDir: "./dist",
  },
});

buildLib()
 