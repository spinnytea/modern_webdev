module.exports = {
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
	],
	rules: {
		"array-bracket-spacing": ["error", "never"],
		"brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
		"comma-dangle": ["error", "always-multiline", { "functions": "never" }],
		"eqeqeq": ["error", "always"],
		"no-console": "off",
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
