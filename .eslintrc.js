module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    // "airbnb",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:vue/vue3-essential",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    semi: ["error", "always"], // 세미콜론 강제 사용
    "import/no-unresolved": "off",
    "comma-dangle": "off",
    "no-new": 0,
    indent: ["error", 2],
    "import/extensions": "off",
    "prettier/prettier": [
      "error",
      // 아래 규칙들은 개인 선호에 따라 prettier 문법 적용
      // https://prettier.io/docs/en/options.html
      // prettier recommend 삭제 후 사용
      {
        // singleQuote: true,
        // semi: true,
        // useTabs: true,
        // tabWidth: 2,
        // trailingComma: "all",
        // printWidth: 120,
        // bracketSpacing: true,
        // arrowParens: "always",
      },
    ],
  },
};
