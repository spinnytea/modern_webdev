define(['json!data/themes.json'], function (themes) {
	return [
		'localStorageService',
		'po_ke_type.defaults.theme', 'po_ke_type.defaults.preferredTypeChart',
		SettingsFactory,
	];

	function SettingsFactory(localStorageService,
		defaultTheme, defaultPreferredTypeChart) {
		var settings = {};

		settings.theme = localStorageService.get('theme') || defaultTheme;
		settings.themes = themes;

		settings.preferredTypeChart = localStorageService.get('preferredTypeChart') || defaultPreferredTypeChart;
		settings.preferredTypeCharts = [
			{ id: 'squares', display: 'Squares' },
			{ id: 'matrix', display: 'Matrix' },
			{ id: 'inline', display: 'Inline' },
		];

		return settings;
	}
});