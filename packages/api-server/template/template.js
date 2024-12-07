const path = require("path");
const fs = require("fs-extra");

const ejs = require("ejs");

const createComponent = async (name, targetAir) => {
  const html = await ejs.renderFile(
    path.resolve(__dirname, "index.ejs"),
    { componentName: name },
    { async: true }
  );
  fs.writeFileSync(path.join(targetAir, "/index.tsx"), html);
};

module.exports = { createComponent };
