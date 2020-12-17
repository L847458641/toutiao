module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 是否逗号结尾 never: 从不
    "comma-dangle": [0, "never"],
    // 是否分号结尾
    semi: [0, "never"],
    // 单引号还是双引号字符串
    quotes: [0, "single"],
    // 方法前是否要一个空格 always: 总是要
    "space-before-function-paren": [0, "never"],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
