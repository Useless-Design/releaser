// 根据询问的结果 进行相应的操作
const { exec } = require('child_process');

const resultHandler = async (result) => {
  const {
    publish, version: { type, version: newVersion }, release, push, changelog, tag,
  } = result;
  // 发布
  if (publish) {
    await exec('npm publish');
  }
  // 升级版本号
  if (type) {
    await exec(`npm version ${type}`);
  }
  // 创建 changelog
  if (changelog) {
    await exec('conventional-changelog -p angular -i CHANGELOG.md -s');
  }
  // 推送到远程仓库
  if (push) {
    await exec('git add .');
    await exec(`git commit -m "chore: ${newVersion}"`);
    await exec('git push');
  }
  // 创建tag
  if (tag) {
    await exec(`git tag v${newVersion}`);
    await exec('git push --tags');
  }
  // 发行
  if (release) {
    await exec('npm run release');
  }
};

module.exports = resultHandler;
