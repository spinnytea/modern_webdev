define(['json!data/themes.json'], function (themes) {
	return [
		'localStorageService',
		'po_ke_type.defaults.theme', 'po_ke_type.defaults.preferredTypeChart', 'po_ke_type.defaults.dexGen', 'po_ke_type.defaults.colorfulCards',
		SettingsFactory,
	];

	function SettingsFactory(localStorageService,
		defaultTheme, defaultPreferredTypeChart, defaultDexGen, defaultColorfulCards) {
		var settings = {};

		settings.theme = localStorageService.get('theme') || defaultTheme;
		settings.themes = themes;

		settings.preferredTypeChart = localStorageService.get('preferredTypeChart') || defaultPreferredTypeChart;
		settings.preferredTypeCharts = [
			{ id: 'squares', display: 'Squares' },
			{ id: 'matrix', display: 'Matrix' },
			{ id: 'inline', display: 'Inline' },
		];

		settings.dexGen = localStorageService.get('dexGen') || defaultDexGen;
		settings.pokedexGenerations = [
			{ id: '1', display: 'Gen I' },
			{ id: '2', display: 'Gen II' },
			{ id: '3', display: 'Gen III' },
			{ id: '4', display: 'Gen IV' },
			{ id: '5', display: 'Gen V' },
			{ id: '6', display: 'Gen VI' },
		];

		settings.colorfulCards = localStorageService.get('colorfulCards') || defaultColorfulCards;

		return settings;
	}
});