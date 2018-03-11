define([], function () {
	return [
		'po_ke_type.utils.tours.factory', 'po_ke_type.pokedex.team.factory',
		HomeToursSeup,
	];

	function HomeToursSeup(tours, team) {
		void(team);
		tours.register({
			name: 'homeIntro',
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

		// TODO change the theme, change it back
		tours.register({
			name: 'explainThemes',
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
				element: '#theme',
				placement: 'bottom',
				content: 'All the available themes are listed here.',
			}, {
				path: '/settings',
				element: '#colorfulCards',
				placement: 'bottom',
				content: 'You can also change the Pokémon cards to have a background color based on their types.',
			}],
		});

		tours.register({
			name: 'explainPokedex',
			title: 'The Pokédex',
			steps: [{
				path: '/',
				element: '[ng-bind="pokedexCount"]',
				placement: 'right',
				content: 'There are sooo many pokémon.',
			}, {
				path: '/',
				element: '.navbar-nav li:contains("Pokédex")',
				placement: 'bottom',
				content: 'You can search through the whole list from the <b>Pokédex</b> page.',
			}, {
				path: '/pokedex',
				element: '#filter',
				placement: 'bottom',
				content: 'This part should be self explanatory. Just type in a string and it will start filter. ' +
					'It will even filter on <b>type</b>, and <b>multiple strings</b>.',
			}, {
				path: '/pokedex',
				element: '.input-group-addon.minimal',
				placement: 'right',
				content: "Changing the number of results isn't very useful in practice, " +
						"it's better to search for something more specific." +
						'This was mostly just a tech demo.',
			}, {
				path: '/settings',
				element: '#dexGen',
				placement: 'top',
				content: 'If you are playing one of the older games, you can ' +
					'narrow the list from the settings by picking a specific generation.',
			}, {
				path: '/settings',
				element: '#pokedexOrderBy',
				placement: 'top',
				content: "Just because each Pokémon has a number, doesn't mean the results need be in that order.",
			}, {
				path: '/pokedex',
				element: '[pokemon-pill]:nth(0) a',
				placement: 'bottom',
				content: 'Once you have found the specific Pokémon you are looking for, ' +
					'you can go to the specific pokmeon with a link in the results.',
			}, {
				path: '/pokedex/Bulbasaur',
				element: 'header:contains(Defending)',
				placement: 'top',
				content: 'You can see how a specific Pokémon with fair against your team.',
			}],
		});

		tours.register({
			name: 'explainTypes',
			title: 'Weaknesses and Resistances',
			steps: [{
				path: '/',
				element: '[ng-bind="typeCount"]',
				placement: 'right',
				content: 'The type system is central to the purpose of this tool. ' +
					'We check your team against other Pokémon to see if they have a type advantage.',
			}, {
				path: '/',
				element: '.navbar-nav li:contains("Type Chart")',
				placement: 'bottom',
				content: 'You can review the weaknesses and resistances for yourself from the <b>Type Chart</b> page.',
			}, {
				path: '/types',
				orphan: true,
				content: 'Your preferred type chart is always displayed first.',
			}, {
				path: '/types',
				element: 'h1 small:visible:nth(0)',
				placement: 'bottom',
				content: 'You can still see the other type charts if some things are easier to reference.',
			}, {
				path: '/settings',
				element: '#preferredTypeChart',
				placement: 'top',
				content: 'You can change which type chart is displayed from the settings page.',
			}, {
				path: '/pokedex/Bulbasaur',
				element: '#typeSquares',
				placement: 'bottom',
				content: 'That said, the Pokémon page always uses type Squares.',
			}],
		});

		// TODO team tour
	}
});