const { readConfig } = require('./file.js');

const defaultConfig = {
  branch: 'all',
  enums: ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
  types: [
    { type: 'feat', section: 'Features', emoji: 'â¨' },
    { type: 'fix', section: 'Bug Fixes', emoji: 'đ' },
    {
      type: 'docs', section: 'Documentation', hidden: false, emoji: 'đ',
    },
    {
      type: 'style', section: 'Styles', hidden: false, emoji: 'đ',
    },
    {
      type: 'refactor', section: 'Code Refactoring', hidden: false, emoji: 'đŚ',
    },
    {
      type: 'perf', section: 'Performance Improvements', hidden: false, emoji: 'đ',
    },
    {
      type: 'test', section: 'Tests', hidden: false, emoji: 'đ¨',
    },
    {
      type: 'build', section: 'Build System', hidden: false, emoji: 'đˇ',
    },
    {
      type: 'ci', section: 'Continuous Integration', hidden: false, emoji: 'đĄ',
    },
    {
      type: 'chore', section: 'Chores', hidden: false, emoji: 'đŻ',
    },
    {
      type: 'revert', section: 'Reverts', hidden: false, emoji: 'âŞ',
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

  // ć šćŽĺćŻĺç§°ĺ¤ć­ćŻĺŚçŹŚĺéç˝Ž
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
