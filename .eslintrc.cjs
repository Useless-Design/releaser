module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:import/recommended'],
  overrides: [
  ],
  plugins: ['import'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    // 检查导入的模块是否存在
    'import/no-unresolved': 'error',
    // 检查导入的模块是否是第三方库，如果是则必须使用完整的包名
    'import/no-extraneous-dependencies': 'error',
    // 检查导入的模块是否使用了相对路径
    'import/no-relative-parent-imports': 'error',
    'import/extensions': 'off',
  },
};
