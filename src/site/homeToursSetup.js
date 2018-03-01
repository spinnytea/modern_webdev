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
			}, {
				element: '[ng-bind="pokedexCount"]',
				content: 'At least we got them all',
			}, {
				element: '[ng-bind="typeCount"]',
				content: 'Check out this stat',
			}, {
				element: 'h1 span:contains(Data Sources)',
				content: 'Does this mean I\'m a great artist? Because of that thing about stealing...',
				placement: 'top',
			}],
		});

		tours.register({
			name: 'explainThemes',
			title: 'UI Themes',
			steps: [{
				element: '[ng-bind="themeCount"]',
				content: 'There are a bunch of different themes to choose from.',
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
				content: 'Just for good measure, here is another step.',
				placement: 'top',
				path: '/#/settings',
			}],
		});
	}
});