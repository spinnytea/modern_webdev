define([], function () {
	return [
		'localStorageService', 'po_ke_type.site.defaultTheme',
		SettingsFactory,
	];

	function SettingsFactory(localStorageService, defaultTheme) {
		var settings = {};

		settings.theme = localStorageService.get('theme') || defaultTheme;

		return settings;
	}
});