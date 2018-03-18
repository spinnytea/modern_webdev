define([], function () {
	var THEME = 'flatly';
	var THEME_ALT = 'journal';

	return [
		'po_ke_type.utils.tours.factory', 'po_ke_type.pokedex.team.factory', 'po_ke_type.site.settings.factory',
		HomeToursSeup,
	];

	function HomeToursSeup(tours, team, settings) {
		tours.register({
			name: 'tourPageHome',
			title: 'My First Tour',
			steps: [{
				element: '[ng-bind="themeCount"]',
				placement: 'right',
				content: 'Well... this is awkard<br>Erm...<br>I mean...<br>Hello, Tour!',
			}, {
				element: '[ng-bind="pokedexCount"]',
				placement: 'right',
				content: 'At least we got them all!',
			}, {
				element: '[ng-bind="typeCount"]',
				placement: 'right',
				content: 'Check out this stat.',
			}, {
				element: '#teamList',
				placement: function () { return (team.length ? 'bottom' : 'top'); },
				content: function () { return (team.length ? 'Looks like you are <em>teaming</em> with Pokédex friends.' : 'Looks like you still need a team.'); },
			}, {
				element: 'h1 span:contains(Data Sources)',
				placement: 'top',
				content: 'Does this mean I\'m a great artist? Because of that thing about stealing...',
			}],
		});

		var userTheme = undefined; // change the theme, change it back
		tours.register({
			name: 'introToThemes',
			title: 'UI Themes',
			steps: [{
				path: '/',
				element: '[ng-bind="themeCount"]',
				placement: 'right',
				content: 'There are a bunch of different themes to choose from.',
			}, {
				path: '/',
				element: '.navbar-right li:contains("Settings")',
				placement: 'left',
				content: 'You can change your theme from the <b>Settings</b> page.',
			}, {
				path: '/settings',
				element: '[for="theme"]',
				placement: 'right',
				content: 'All the available themes are listed here.',
				onNext: function () {
					userTheme = settings.theme;
					if(settings.theme === THEME) settings.theme = THEME_ALT;
					else settings.theme = THEME;
				},
			}, {
				path: '/settings',
				element: '[for="theme"]',
				placement: 'right',
				content: 'Just pick another one from the list to try them out.',
				onNext: function () { if(userTheme) settings.theme = userTheme; },
				onPrev: function () { if(userTheme) settings.theme = userTheme; },
			}, {
				path: '/settings',
				element: '[for="colorfulCards"]',
				placement: 'right',
				content: 'You can also change the Pokémon cards to have a background color based on their types.',
			}],
		});
	}
});