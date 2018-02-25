define(['json!data/themes.json'], function (themes) {
	return [
		'$rootScope', 'localStorageService',
		'po_ke_type.defaults.theme', 'po_ke_type.defaults.preferredTypeChart', 'po_ke_type.defaults.dexGen', 'po_ke_type.defaults.colorfulCards',
		SettingsFactory,
	];

	function SettingsFactory($rootScope, localStorageService,
			defaultTheme, defaultPreferredTypeChart, defaultDexGen, defaultColorfulCards) {
		var settings = {};

		// index default values
		var defaults = {
			theme: defaultTheme,
			preferredTypeChart: defaultPreferredTypeChart,
			dexGen: defaultDexGen,
			colorfulCards: defaultColorfulCards,
		};

		// init values on settings
		Object.keys(defaults).forEach(function (name) {
			settings[name] = localStorageService.get(name) || defaults[name];
		});

		// if the values are removed from local storage, then reset them to the defaults
		$rootScope.$on('LocalStorageModule.notification.removeitem', function (event, args) {
			if(args.key in defaults) {
				settings[args.key] = defaults[args.key];
			}
		});

		settings.themes = themes;

		settings.availableTypeCharts = [
			{ id: 'squares', display: 'Squares' },
			{ id: 'matrix', display: 'Matrix' },
			{ id: 'inline', display: 'Inline' },
		];

		settings.pokedexGenerations = [
			{ id: '1', display: 'Gen I' },
			{ id: '2', display: 'Gen II' },
			{ id: '3', display: 'Gen III' },
			{ id: '4', display: 'Gen IV' },
			{ id: '5', display: 'Gen V' },
			{ id: '6', display: 'Gen VI' },
		];

		return settings;
	}
});