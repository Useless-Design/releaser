import { readConfig } from './file.js';

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
  #config = {
    branch: 'all',
  };

  constructor() {
    readConfig().then((config) => {
      this.#config = {
        ...defaultConfig,
        ...config,
      };
    });
  }

  // 根据分支名称判断是否符合配置
  isMatchBranch(curBranch) {
    const { branch } = this.#config;
    if (branch === 'all') {
      return true;
    }
    return branch.includes(curBranch);
  }
}

const config = new Config();

export default config;