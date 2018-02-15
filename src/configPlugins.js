define([], function () {
	require.config({
		paths : {
			// create alias to plugins (not needed if plugins are on the baseUrl)
			async: 'vendor/requirejs/async',
			font: 'vendor/requirejs/font',
			goog: 'vendor/requirejs/goog',
			image: 'vendor/requirejs/image',
			json: 'vendor/requirejs/json',
			noext: 'vendor/requirejs/noext',
			mdown: 'vendor/requirejs/mdown',
			propertyParser : 'vendor/requirejs/propertyParser',
			text: 'vendor/requirejs/text',
			markdownConverter : 'vendor/requirejs/Markdown.Converter',
		},
	});
});