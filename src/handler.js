// 根据询问的结果 进行相应的操作
const { exec } = require('child_process');
const shellColor = require('./utils/color');

const createTag = async (version) => {
  const tag = `v${version}`;
  // 修改package中的version
  exec(`git tag ${tag}`, (error) => {
    if (error) {
      console.log(shellColor.red(`🚫 创建tag失败: ${error}`));
      process.exit(1);
    }
    console.log(shellColor.green(`🎉 创建tag成功: ${tag}`));
    // 修改package.json文件中的version
    exec(`npm version ${version}`, (err) => {
      if (err) {
        console.log(shellColor.red(`🚫 修改package.json中的version失败: ${err}`));
      }
    });
  });
};

const handlerEvent = new Map([
  ['publish', async () => {
    console.log('发布');
  }],
  ['release', async () => {
    console.log('发布');
  }],
  ['push', async () => {
    console.log('发布');
  }],
  ['changelog', async (version) => {
    console.log('version', version);
  }],
  ['tag', createTag],
]);

const resultHandler = async (result) => {
  const { version: { version: newVersion }, ...other } = result;

  // 执行操作
  Object.keys(other).forEach(async (key) => {
    if (other[key]) await handlerEvent.get(key)(newVersion);
  });
};

module.exports = resultHandler;
