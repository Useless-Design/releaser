// 根据询问的结果 进行相应的操作
const { exec } = require('child_process');
const shellColor = require('./utils/color');
const changelogHandler = require('./create-change-log');

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

const toPublish = async () => {
  exec('npm publish', (error) => {
    if (error) {
      console.log(shellColor.red(`🚫 发布失败: ${error}`));
      process.exit(1);
    }
    console.log(shellColor.green('🎉 发布成功'));
  });
};

// 发布到github release
const toRelease = async () => {
  exec('git ');
};

const toPush = async () => {
  exec('git push', (error) => {
    if (error) {
      console.log(shellColor.red(`🚫 推送失败: ${error}`));
      process.exit(1);
    }
    console.log(shellColor.green('🎉 推送成功'));
  });
};

// 生成changelog.md文件
const createChangelog = async (version) => {
  const commits = await changelogHandler.getCommits();
  // 创建中的控制台提示
  console.log(shellColor.green('🔥 正在生成changelog.md文件...'));
  await changelogHandler.appendToChangelog(commits, version);
  console.log(shellColor.green('🎉 changelog.md文件生成成功'));
};

const handlerEvent = new Map([
  ['publish', toPublish],
  ['release', toRelease],
  ['push', toPush],
  ['changelog', createChangelog],
  ['tag', createTag],
]);

const resultHandler = async (result) => {
  const { version: { version: newVersion }, ...other } = result;
  createChangelog(newVersion);
  // 执行操作
  // Object.keys(other).forEach(async (key) => {
  //   if (other[key]) await handlerEvent.get(key)(newVersion);
  // });
};

module.exports = resultHandler;
