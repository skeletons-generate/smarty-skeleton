// const fs = require('fs');
// const path = require('path');
import fs from 'fs';
import path from 'path';
const dirname = path.dirname(new URL(import.meta.url).pathname);
// 读取package.json文件
const packageJsonPath = './package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
// 解析版本号
const versionParts = packageJson.version.split('.');
versionParts[2] = parseInt(versionParts[2]) + 1;
packageJson.version = versionParts.join('.');
// 写入更新后的package.json文件
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));