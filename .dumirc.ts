import { defineConfig } from "dumi";
import style from "./dumi-docs/siteIndexStyle";
import path from "path";

let base: string | undefined;
let publicPath: string | undefined;

if (process.env.PREVIEW !== "1") {
  base = "/smarty-skeleton/";
  publicPath = "/smarty-skeleton/";
}

export default defineConfig({
  base,
  publicPath,
  title: "smarty skeleton", // 站点名称
  outputPath: "sites", // 输出文件夹
  resolve: {
    docDirs: [
      "dumi-docs",
      "/packages/react-component/src",
      "/packages/component-with-fixed/src",
      "/packages/loading-with-cache/src",
    ],
    atomDirs: [
      { type: "component", dir: "/packages/component-with-fixed/src" },
      { type: "component1", dir: "/packages/loading-with-cache/src" },
    ],
    codeBlockMode: "passive",
  },
  alias: {
    SmartySkeleton: path.join(__dirname, "packages/component-with-fixed/src"),
  },
  themeConfig: {
    name: "smarty skeleton",
    carrier: "dumi", // 设备状态栏左侧的文本内容
    hd: true,
    rtl: true,
    footer:
      "Copyright © 2024-2024 Smarty Skeleton. All Rights Reserved. Smarty Skeleton 版权所有.",
    nav: [
      {
        title: "指南",
        link: "/guide",
      },
      {
        title: "loading",
        link: "/loading",
      },
      {
        title: "组件",
        link: "/components/page1",
      },
    ],
  },
  styles: [style],
});
