const path = require("path");
const fs = require("fs-extra");
const template = require("./template");
module.exports = async function (name, options={}) {
  const cwd = process.cwd();
  const targetAir = path.join(cwd, name);
  if (fs.existsSync(targetAir)) {
    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir);
    }
  }
  console.log('testyyy',targetAir)
  fs.mkdirsSync(targetAir)
  template.createComponent(name, targetAir);
};
