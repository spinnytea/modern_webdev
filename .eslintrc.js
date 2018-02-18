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
		"computed-property-spacing": ["error", "never"],
		"eqeqeq": ["error", "always"],
		"key-spacing": ["error", {
			"beforeColon": false,
			"afterColon": true,
			"mode": "strict",
		}],
		"no-console": "off",
		"no-shadow": ["error"],
		"object-curly-spacing": ["error", "always"],
		"quotes": ["error", "single", { "avoidEscape": true }],
		"semi": ["error", "always"],
		"space-before-function-paren": ["error", {
			"anonymous": "always",
			"named": "never",
			"asyncArrow": "always",
		}],
	},
};
