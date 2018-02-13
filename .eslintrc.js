module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: 'eslint:recommended',
  rules: {
    "no-console": "off",
    "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
    "comma-dangle": ["error", "always-multiline", { "functions": "never" }],
    "eqeqeq": ["error", "always"],
    "no-shadow": ["error"],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always",
    }]
  },
};
