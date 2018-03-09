module.exports = {
	env: {
		browser: true,
		node: false,
	},
	plugins: [
		"angular",
		"requirejs",
	],
	extends: [
		'plugin:angular/johnpapa',
		'plugin:requirejs/recommended',
	],
	rules: {
		'angular/controller-as': 'off',
		'angular/controller-as-route': 'off',
		'angular/controller-name': ['error', '/(\\w+\\.)+controller/'],
		'angular/directive-restrict': 'off',
		'angular/file-name': 'off',
		'angular/function-type': ['error', 'named'],
		'angular/module-getter': 'off',
		'angular/module-setter': 'off',
	},
};
