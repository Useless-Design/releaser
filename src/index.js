#!/usr/bin/env node

const {
  askPublish, askVersion, askChangelog, askPush, askRelease, askTag,
} = require('./utils/inquirer.js');
const { getNewVersion, getVersion } = require('./utils/version.js');
const resultHandler = require('./handler.js');
const config = require('./utils/config.js');

config.init();

// 执行命令 询问用户输入获取结果
const init = async () => {
  const curVersion = await getVersion();

  const allVersion = getNewVersion(curVersion);
  const result = {
    publish: false,
    version: {
      type: 'patch',
      version: curVersion,
    },
    release: false,
    push: false,
    changelog: false,
    tag: false,
  };

  result.publish = await askPublish();
  if (!result.publish) {
    process.exit(0);
  }
  result.version = await askVersion(curVersion, allVersion);
  result.tag = await askTag();
  result.changelog = await askChangelog();
  result.push = await askPush();
  result.release = await askRelease();

  resultHandler(result);
};

init();
