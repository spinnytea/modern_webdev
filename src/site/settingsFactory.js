define([], function () {
	return [
		'po_ke_type.site.defaultTheme',
		SettingsFactory,
	];

	function SettingsFactory(defaultTheme) {
		var settings = {};

		settings.theme = defaultTheme;

		return settings;
	}
});