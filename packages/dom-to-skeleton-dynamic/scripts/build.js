import fs from 'fs'
import path from 'path'
import { defineConfig,build } from "vite";

const entryDir = path.resolve(__dirname, '../src')
const outputDir = path.resolve(__dirname, '../lib')


// export default defineConfig({
//   build: {
//     lib: {
//       entry: "./src/index.js",
//       name: "Counter",
//       fileName: "counter",
//       formats: ['es', 'cjs', 'umd', 'iife']
//     },
//     rollupOptions: {
//       external: /^react|react-dom$/,
//       globals: {
//         react: "React",
//         "react-dom": "ReactDOM",
//       },
//       output: [
//         {
//           format: "es",
//           dir: "dist",
//           exports: "named",
//           entryFileNames: "[name].esm.js",
//           chunkFileNames: "[name].esm.js",
//           preserveModules: true, // 保留模块结构
//           preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
//         },
//         {
//           format: "cjs",
//           dir: "dist",
//           exports: "named",
//           entryFileNames: "[name].cjs",
//           chunkFileNames: "[name].cjs",
//           preserveModules: true, // 保留模块结构
//           preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
//         },
//         // {
//         //   format: "umd",
//         //   name:"[name]",
//         //   dir: "dist",
//         //   exports: "named",
//         //   entryFileNames: "[name].umd.js",
//         //   chunkFileNames: "[name].umd.js",
//         //   preserveModules: true, // 保留模块结构
//         //   preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
//         // },
//         // {
//         //   format: "iife",
//         //   dir: "dist",
//         //   exports: "named",
//         //   name:"[name]iife",
//         //   entryFileNames: "[name].iife.js",
//         //   chunkFileNames: "[name].iife.js",
//         //   preserveModules: true, // 保留模块结构
//         //   preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
//         // },
//       ],
//     },
//     outDir: "./dist",
//   },
// });

 

const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  // plugins: [vue(), vueJsx()]
})

const rollupOptions = {
  external: /^react|react-dom$/,
  globals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
}
 
const buildAll = async () => {
  await build(defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.jsx'),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'umd']
      },
      outDir: outputDir
    }
  }))
}


const buildSingle = async (name) => {
 
  await build(defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, name),
        name: "index",
        fileName: "index",
        formats: ['es', 'umd']
      },
      outDir: path.resolve(outputDir, name)
    }
  }))
}

 
// 递归扫描目录，获取所有文件
function getAllFiles(srcpath) {
  const files = []
  const scanDir = dir => {
    const filesInDir = fs.readdirSync(dir)
    filesInDir.forEach(file => {
      const filePath = path.join(dir, file)
      if (fs.statSync(filePath).isDirectory()) {
        scanDir(filePath)
      } else {
        files.push(filePath)
      }
    })
  }
  scanDir(srcpath)
  return files
}


// 扫描入口文件
const getEntryConfig = (scanDir = './src', ignoreFileDir = ['business']) => {
  let entryPoints = {}
  getAllFiles(scanDir).forEach(filePath => {
    const ext = path.extname(filePath).toLowerCase();
    console.log(filePath.split('/'),'extext')
    const [, dirName] = filePath.split('/')

    if (ignoreFileDir.includes(dirName)) {
      console.warn('entryPoints', entryPoints, dirName, filePath)
      return
    }
    const basename = path.basename(filePath)
    const relativePath = path.relative('./src', filePath)
    if (fs.statSync(filePath).isDirectory()) {
      return
    } else {
      // const [fileName] = basename.split('.')

      if ( ['.tsx', '.js', '.jsx'].includes(ext)) {
        const entryName = relativePath.replace(/\.(tsx|ts|js|jsx)$/, '')
        entryPoints[entryName] = filePath
      }
    }
  })

  return entryPoints
}

console.log(getEntryConfig(),'entry')
//执行getEntryConfig函数，可以得到这个对象
// const _entryPoints = {
//   'comps/button/index': 'src/comps/button/index.tsx',
//   'comps/image/index': 'src/comps/image/index.tsx',
//   'comps/upload/index': 'src/comps/upload/index.tsx',
// }

const buildLib = async () => {
  await buildAll()
  // 获取组件名称组成的数组
  const files =await getEntryConfig();
  for(let name in files){
    await buildSingle(name)
  }


}

export default buildLib;
// buildLib()
 