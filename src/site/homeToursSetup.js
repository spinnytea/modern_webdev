define([], function () {
	return [
		'po_ke_type.utils.tours.factory',
		HomeToursFactory,
	];

	function HomeToursFactory(tours) {
		tours.register({
			name: 'homeIntro',
			title: 'My First Tour',
			steps: [{
				element: '[ng-bind="themeCount"]',
				placement: 'right',
				content: 'Well... this is awkard',
			}, {
				element: '[ng-bind="pokedexCount"]',
				placement: 'right',
				content: 'At least we got them all',
			}, {
				element: '[ng-bind="typeCount"]',
				placement: 'right',
				content: 'Check out this stat',
			}, {
				element: 'h1 span:contains(Data Sources)',
				placement: 'top',
				content: 'Does this mean I\'m a great artist? Because of that thing about stealing...',
			}],
		});

		// TODO change the theme, change it back
		tours.register({
			name: 'explainThemes',
			title: 'UI Themes',
			steps: [{
				path: '/#/',
				element: '[ng-bind="themeCount"]',
				placement: 'right',
				content: 'There are a bunch of different themes to choose from.',
			}, {
				path: '/#/',
				element: '.navbar-right li:contains("Settings")',
				placement: 'left',
				content: 'You can change your theme from the <b>Settings</b> page.',
			}, {
				path: '/#/settings',
				element: '#theme',
				placement: 'bottom',
				content: 'All the available themes are listed here.',
			}, {
				path: '/#/settings',
				element: '#colorfulCards',
				placement: 'top',
				content: 'You can also change the pokemon cards to have a background color based on their types.',
			}],
		});

		// TODO finish explainPokedex
		tours.register({
			name: 'explainPokedex',
			title: 'The Pokédex',
			steps: [{
				path: '/#/',
				element: '[ng-bind="pokedexCount"]',
				placement: 'right',
				content: 'There are sooo many pokémon.',
			}, {
				path: '/#/',
				element: '.navbar-nav li:contains("Pokédex")',
				placement: 'bottom',
				content: 'You can search through the whole list from the <b>Pokédex</b> page.',
			}, {
				path: '/#/pokedex',
				element: '#filter',
				placement: 'bottom',
				content: 'This part should be self explanatory. Just type in a string and it will start filter. ' +
					'It will even filter on <b>type</b>, and <b>multiple strings</b>.',
			}, {
				path: '/#/pokedex',
				element: '.input-group-addon.minimal',
				placement: 'left',
				content: "Changing the number of results isn't very useful in practice, " +
					"it's better to search for something more specific." +
					'This was mostly just a tech demo.',
			}],
		});

		// TODO type tour
		// TODO team tour
	}
});