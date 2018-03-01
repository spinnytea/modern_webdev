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
				content: 'Well... this is awkard',
				placement: 'right',
			}, {
				element: '[ng-bind="pokedexCount"]',
				content: 'At least we got them all',
				placement: 'right',
			}, {
				element: '[ng-bind="typeCount"]',
				content: 'Check out this stat',
				placement: 'right',
			}, {
				element: 'h1 span:contains(Data Sources)',
				content: 'Does this mean I\'m a great artist? Because of that thing about stealing...',
				placement: 'top',
			}],
		});

		// TODO change the theme, change it back
		tours.register({
			name: 'explainThemes',
			title: 'UI Themes',
			steps: [{
				element: '[ng-bind="themeCount"]',
				content: 'There are a bunch of different themes to choose from.',
				placement: 'right',
				path: '/#/',
			}, {
				element: '.navbar-right li:contains("Settings")',
				content: 'You can change your theme from the <b>Settings</b> page.',
				placement: 'left',
				path: '/#/',
			}, {
				element: '#theme',
				content: 'All the available themes are listed here.',
				placement: 'bottom',
				path: '/#/settings',
			}, {
				element: '#colorfulCards',
				content: 'You can also change the pokemon cards to have a background color based on their types.',
				placement: 'top',
				path: '/#/settings',
			}],
		});

		// TODO finish explainPokedex
		tours.register({
			name: 'explainPokedex',
			title: 'The Pokédex',
			steps: [{
				element: '[ng-bind="pokedexCount"]',
				content: 'There are sooo many pokémon.',
				placement: 'right',
				path: '/#/',
			}, {
				element: '.navbar-nav li:contains("Pokédex")',
				content: 'You can search through the whole list from the <b>Pokédex</b> page.',
				placement: 'bottom',
				path: '/#/',
			}],
		});

		// TODO type tour
		// TODO team tour
	}
});