module.exports = {
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
