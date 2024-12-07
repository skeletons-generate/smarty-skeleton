const express = require("express");
const router = require("./routes");
const bodyParser = require('body-parser');


const PORT = 3000; // 用于设置端口号
const app = express(); // 创建一个express应用程序实例
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
 
// 启动 Express 应用程序，监听在指定的端口上
app.listen(PORT, () => {
  // 在控制台输出服务器运行信息
  console.log(`Server is running at http://localhost:${PORT}`);
});
