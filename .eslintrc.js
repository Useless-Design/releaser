// .eslintrc.js
module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
        extensions: [".js", ".ts"]
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'prettier/@typescript-eslint'
    ],
    rules: {
        "prettier/prettier": ["error", {
            singleQuote: true
        }],
        "no-unused-vars": ["warn", {
            argsIgnorePattern: '^_'
        }]
    },
    plugins: ['@typescript-eslint', 'prettier']
}
module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    }
}
