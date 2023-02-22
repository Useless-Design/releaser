const { readConfig } = require('./file.js');

const defaultConfig = {
  branch: 'all',
  enums: ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
  types: [
    { type: 'feat', section: 'Features', emoji: '✨' },
    { type: 'fix', section: 'Bug Fixes', emoji: '🐛' },
    {
      type: 'docs', section: 'Documentation', hidden: false, emoji: '📚',
    },
    {
      type: 'style', section: 'Styles', hidden: false, emoji: '💄',
    },
    {
      type: 'refactor', section: 'Code Refactoring', hidden: false, emoji: '📦',
    },
    {
      type: 'perf', section: 'Performance Improvements', hidden: false, emoji: '🚀',
    },
    {
      type: 'test', section: 'Tests', hidden: false, emoji: '🚨',
    },
    {
      type: 'build', section: 'Build System', hidden: false, emoji: '👷',
    },
    {
      type: 'ci', section: 'Continuous Integration', hidden: false, emoji: '🎡',
    },
    {
      type: 'chore', section: 'Chores', hidden: false, emoji: '🗯',
    },
    {
      type: 'revert', section: 'Reverts', hidden: false, emoji: '⏪',
    },
  ],
};

class Config {
  constructor() {
    this.config = {
      ...defaultConfig,
    };
  }

  async init() {
    const config = await readConfig();
    this.config = {
      ...defaultConfig,
      ...config,
    };
  }

  getEnums() {
    return this.config.enums;
  }

  getTemplate() {
    return this.config.saveTemplate;
  }

  getEmojis() {
    const { enums, types } = this.config;
    const emojis = {};
    enums.forEach((item) => {
      const type = types.find((t) => t.type === item);
      emojis[item] = type.emoji;
    });
    return emojis;
  }

  getSections() {
    const { enums, types } = this.config;
    const sections = {};
    enums.forEach((item) => {
      const type = types.find((t) => t.type === item);
      sections[item] = type.section;
    });
    return sections;
  }

  // 根据分支名称判断是否符合配置
  isMatchBranch(curBranch) {
    const { branch } = this.config;
    if (branch === 'all') {
      return true;
    }
    return branch.includes(curBranch);
  }
}

const config = new Config();

module.exports = config;
