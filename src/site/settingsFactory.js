define(['json!data/themes.json'], function (themes) {
	return [
		'localStorageService', 'po_ke_type.site.defaultTheme',
		SettingsFactory,
	];

	function SettingsFactory(localStorageService, defaultTheme) {
		var settings = {};

		settings.theme = localStorageService.get('theme') || defaultTheme;
		settings.themes = themes;

		return settings;
	}
});