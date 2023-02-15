import inquirer from 'inquirer';
import chalk from 'chalk';
import git from './git.js';

// 询问是否发布版本
export const askPublish = async () => {
  const curBranch = await git.getCurrentBranch();
  const hasUnCommit = await git.hasUncommittedChanges();
  if (curBranch !== 'master') {
    console.log(chalk.red('🚫 请在master分支上发布版本'));
    process.exit(1);
  }
  if (hasUnCommit) {
    console.log(chalk.red('🚫 请先提交所有代码'));
    process.exit(1);
  }
  const { publish } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'publish',
      message: chalk.green('🚀 是否发布版本'),
      default: true,
    },
  ]);
  return publish;
};

// 询问版本号
export const askVersion = async (curVersion, allVersion) => {
  const {
    major, minor, patch, alpha, beta, rc,
  } = allVersion;
  const { version } = await inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: chalk.green(`🔥 当前版本号: ${curVersion}`),
      choices: [
        {
          name: `patch: ${patch}`,
          value: 'patch',
        },
        {
          name: `minor: ${minor}`,
          value: 'minor',
        },
        {
          name: `major: ${major}`,
          value: 'major',
        },
        {
          name: `alpha: ${alpha}`,
          value: 'alpha',
        },
        {
          name: `beta: ${beta}`,
          value: 'beta',
        },
        {
          name: `rc: ${rc}`,
          value: 'rc',
        },
        {
          name: 'custom',
          value: 'custom',
        },
      ],
      default: 'patch',
      // 如果是自定义版本号，需要输入版本号
      filter: (val) => {
        if (val === 'custom') {
          return inquirer.prompt([
            {
              type: 'input',
              name: 'version',
              message: chalk.green('🎨 请输入版本号'),
              validate: (input) => {
                if (/^(\d+\.){2}\d+(-\w+\.\d+)?$/.test(input)) {
                  return true;
                }
                return '请输入正确的版本号';
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
      type: 'confirm',
      name: 'release',
      message: chalk.green('🎉 是否发行?'),
      default: true,
    },
  ]);
  return release;
};

// 询问是否推送
export const askPush = async () => {
  const { push } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'push',
      message: chalk.green('📦 是否推送到远程仓库?'),
      default: true,
    },
  ]);
  return push;
};

// 询问是否创建 changelog
export const askChangelog = async () => {
  const { changelog } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'changelog',
      // chalk + emoji
      message: chalk.green('📝 是否创建 CHANGELOG'),
      default: true,
    },
  ]);
  return changelog;
};

// 询问是否创建tag
export const askTag = async () => {
  const { tag } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'tag',
      message: chalk.green('🔖 是否创建 tag'),
      default: true,
    },
  ]);
  return tag;
};
