module.exports = {
  env: {
    browser: true,
  },
  plugins: [
    "requirejs",
  ],
  extends: [
    'eslint:recommended',
    'plugin:requirejs/recommended',
  ],
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
