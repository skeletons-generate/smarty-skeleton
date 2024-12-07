const simpleGit = require("simple-git");
const path = require("path");
const fs = require("fs");
const os = require("os");
const fsExtra = require("fs-extra");
const ejs = require("ejs");

async function createDir({targetDir,pageName,templateDir}) {
  
  if (!fsExtra.existsSync(targetDir)) {
    console.log(1)
     await fsExtra.mkdirsSync(targetDir);
    const mdHeader = await ejs.renderFile(
      path.resolve(templateDir, "mdHeader.ejs"),
      {pageName}
    );
    fsExtra.writeFileSync(path.join(targetDir, "/index.md"), mdHeader);   
  }
   
}

async function copyFile({targetDir, templateDir, rawHtml, componentName,pageName}) {
 
  const rawContent = await ejs.renderFile(
    path.resolve(templateDir, "component.ejs"),
    { rawHtml },
    { async: true }
  );
  fsExtra.writeFileSync(path.join(targetDir, `/${componentName}.tsx`), rawContent);
  const mdContent = await ejs.renderFile(
    path.resolve(templateDir, "mdItem.ejs"),
    { componentName },
    { async: true }
  );
  console.log(mdContent,'mdmmm')
  fsExtra.appendFileSync(path.join(targetDir, "/index.md"), mdContent);

}

module.exports = async function modifyGit({ pageName,componentName, rawHtml }) {
  // 创建一个临时目录来克隆仓库
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "repo1-"));
  
  // 克隆仓库到临时目录
  simpleGit().clone(
    "git@github.com:huabuyu05100510/pnpm-monorepo.git",
    tempDir,
    (err) => {
      if (err) {
        console.error("克隆仓库失败", err);
        return;
      }
 
      // 进入仓库目录
      const templateDir = `${tempDir}/packages/component-with-fixed/templates2`;
      const srcDir = `${tempDir}/packages/component-with-fixed/src`;
      const targetDir = `${srcDir}/${pageName}`;
      process.chdir(srcDir);
      createDir({targetDir,pageName,templateDir});
      copyFile({targetDir, templateDir, rawHtml, componentName,pageName})
    //   fs.writeFileSync(path.join(targetAir, "/index.tsx"), html);
      //创建文件
      // 修改文件或代码
    //   fs.writeFileSync("your-file.js", 'console.log("Hello, World!");');

      // 添加所有更改到暂存区
      simpleGit().add(".", (addErr) => {
        if (addErr) {
          console.error("添加更改失败", addErr);
          return;
        }

        // 提交更改
        simpleGit().commit(`skeleton ${pageName}/${componentName}推送成功`, (commitErr) => {
          if (commitErr) {
            console.error("提交更改失败", commitErr);
            return;
          }

          // 推送更改到远程仓库
          simpleGit().push("origin", "main", (pushErr) => {
            if (pushErr) {
              console.error("推送更改失败", pushErr);
              return;
            }

            console.log(`skeleton ${pageName}/${componentName}推送远程仓库`);
          });
        });
      });
    }
  );
};
