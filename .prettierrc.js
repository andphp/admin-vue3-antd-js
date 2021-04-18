module.exports = {
  // 最大长度80个字符
  printWidth: 80,
  // 行末分号
  semi: true,
  // 单引号
  singleQuote: false,
  // JSX双引号
  jsxSingleQuote: false,
  // 尽可能使用尾随逗号（包括函数参数）
  trailingComma: "es6",
  // 在对象文字中打印括号之间的空格。
  bracketSpacing: true,
  // > 标签放在最后一行的末尾，而不是单独放在下一行
  jsxBracketSameLine: false,
  // 箭头圆括号//始终给箭头函数的参数加括号
  arrowParens: "always",
  // 在文件顶部插入一个特殊的 @format 标记，指定文件格式需要被格式化。
  insertPragma: false,
  // 缩进
  tabWidth: 2,
  // 使用tab还是空格
  useTabs: false,
  // 行尾换行格式
  endOfLine: "auto",
  HTMLWhitespaceSensitivity: "ignore",
  extends: [
    // 继承 vue 的标准特性
    "plugin:vue/essential",
    "eslint:recommended",
    // 避免与 prettier 冲突
    "plugin:prettier/recommended",
  ],
};
