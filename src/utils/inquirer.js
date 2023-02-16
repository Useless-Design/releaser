const inquirer = require('inquirer');
const shellColor = require('./color.js');
const git = require('./git.js');
const config = require('./config.js');

// 询问是否发布版本
const askPublish = async () => {
  const curBranch = await git.getCurrentBranch();
  if (!config.isMatchBranch(curBranch)) {
    console.log(shellColor.red('🚫 请在master分支上发布版本'));
    process.exit(1);
  }
  const hasUnCommit = await git.hasUncommittedChanges();
  if (hasUnCommit) {
    console.log(shellColor.red('🚫 请先提交所有代码'));
    process.exit(1);
  }
  const { publish } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'publish',
      message: shellColor.green('🚀 是否发布版本'),
      default: true,
    },
  ]);
  return publish;
};

// 询问版本号
const askVersion = async (curVersion, allVersion) => {
  const {
    major, minor, patch, alpha, beta, rc,
  } = allVersion;
  const { version } = await inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: shellColor.green(`🔥 当前版本号: ${curVersion}`),
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
              message: shellColor.green('🎨 请输入版本号'),
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
const askRelease = async () => {
  const { release } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'release',
      message: shellColor.green('🎉 是否发行?'),
      default: true,
    },
  ]);
  return release;
};

// 询问是否推送
const askPush = async () => {
  const { push } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'push',
      message: shellColor.green('📦 是否推送到远程仓库?'),
      default: true,
    },
  ]);
  return push;
};

// 询问是否创建 changelog
const askChangelog = async () => {
  const { changelog } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'changelog',
      // shellColor + emoji
      message: shellColor.green('📝 是否创建 CHANGELOG'),
      default: true,
    },
  ]);
  return changelog;
};

// 询问是否创建tag
const askTag = async () => {
  const { tag } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'tag',
      message: shellColor.green('🔖 是否创建 tag'),
      default: true,
    },
  ]);
  return tag;
};

module.exports = {
  askPublish,
  askVersion,
  askRelease,
  askPush,
  askChangelog,
  askTag,
};
