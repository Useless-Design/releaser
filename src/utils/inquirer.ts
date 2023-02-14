import inquirer from "inquirer";
import { getNewVersion } from "./version";

export type IVersion =
  | "major"
  | "minor"
  | "patch"
  | "alpha"
  | "beta"
  | "rc"
  | "custom";
export interface IAnswers {
  publish: boolean;
  version: {
    type: IVersion;
    version: string;
  };
  release: boolean;
  push: boolean;
  changelog: boolean;
  tag: boolean;
}

// 询问是否发布版本
export const askPublish = async () => {
  const { publish } = await inquirer.prompt([
    {
      type: "confirm",
      name: "publish",
      message: "是否发布版本",
      default: true,
    },
  ]);
  return publish;
};

// 询问版本号
export const askVersion = async (curVersion: string) => {
  const allVersion = getNewVersion(curVersion);
  const { major, minor, patch, alpha, beta, rc } = allVersion;
  const { version } = await inquirer.prompt([
    {
      type: "list",
      name: "version",
      message: `请选择版本号, 当前版本号为：${curVersion}`,
      choices: [
        {
          name: `major: ${major}`,
          value: "major",
        },
        {
          name: `minor: ${minor}`,
          value: "minor",
        },
        {
          name: `patch: ${patch}`,
          value: "patch",
        },
        {
          name: `alpha: ${alpha}`,
          value: "alpha",
        },
        {
          name: `beta: ${beta}`,
          value: "beta",
        },
        {
          name: `rc: ${rc}`,
          value: "rc",
        },
        {
          name: `custom`,
          value: "custom",
        },
      ],
      default: "patch",
      // 如果是自定义版本号，需要输入版本号
      filter: (val: string) => {
        if (val === "custom") {
          return inquirer.prompt([
            {
              type: "input",
              name: "version",
              message: "请输入版本号",
              validate: (input: string) => {
                if (/^(\d+\.){2}\d+(-\w+\.\d+)?$/.test(input)) {
                  return true;
                }
                return "请输入正确的版本号";
              },
            },
          ]);
        }
        return val;
      },
    },
  ]);
  return {
    type: version,
    version: allVersion[version],
  };
};

// 询问是否发行
export const askRelease = async () => {
  const { release } = await inquirer.prompt([
    {
      type: "confirm",
      name: "release",
      message: "是否发行版本",
      default: true,
    },
  ]);
  return release;
};

// 询问是否推送
export const askPush = async () => {
  const { push } = await inquirer.prompt([
    {
      type: "confirm",
      name: "push",
      message: "是否推送到远程",
      default: true,
    },
  ]);
  return push;
};

// 询问是否创建 changelog
export const askChangelog = async () => {
  const { changelog } = await inquirer.prompt([
    {
      type: "confirm",
      name: "changelog",
      message: "是否创建 CHANGELOG",
      default: true,
    },
  ]);
  return changelog;
};

// 询问是否创建tag
export const askTag = async () => {
  const { tag } = await inquirer.prompt([
    {
      type: "confirm",
      name: "tag",
      message: "是否创建 tag",
      default: true,
    },
  ]);
  return tag;
};
