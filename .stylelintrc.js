module.exports = {
	extends: 'stylelint-config-recommended',
	ignoreFiles: [
		'src/for.less',

		// BUG i think the latest vscode update did someting funky to stylelint
		'README.md',
		'**/*.html',
	],
};
