#!/usr/bin/env node

import {
  askPublish, askVersion, askChangelog, askPush, askRelease, askTag,
} from './utils/inquirer.js';
import { getNewVersion, getVersion } from './utils/version.js';

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
  result.version = await askVersion(curVersion, allVersion);
  result.tag = await askTag();
  result.changelog = await askChangelog();
  result.push = await askPush();
  result.release = await askRelease();
};

init();
