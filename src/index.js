#!/usr/bin/env node

import {
  askChangelog,
  askPublish,
  askPush,
  askRelease,
  askTag,
  askVersion,
  IAnswers,
} from "./utils/inquirer";
import { getVersion } from "./utils/version";

// 执行命令 询问用户输入获取结果
const init = async () => {
  const curVersion = await getVersion();
  const result = {
    publish: false,
    version: {
      type: "patch",
      version: curVersion,
    },
    release: false,
    push: false,
    changelog: false,
    tag: false,
  };
  result.publish = await askPublish();
  result.version = await askVersion(curVersion);
  result.tag = await askTag();
  result.changelog = await askChangelog();
  result.push = await askPush();
  result.release = await askRelease();
  console.log("[ result ] >", result);
};

init();
