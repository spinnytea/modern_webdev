module.exports = {
	extends: 'stylelint-config-recommended',
	ignoreFiles: [
		'src/for.less',
		'README.md', // QUESTION why is stylelint processing README.md?
	],
};
