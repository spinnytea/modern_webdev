define([], function () {
	return [
		'po_ke_type.utils.tours.factory', 'po_ke_type.pokedex.team.factory',
		PokedexToursSeup,
	];

	function PokedexToursSeup(tours, team) {
		tours.register({
			name: 'introToPokedex',
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
				path: '/pokedex',
				element: '.navbar-right li:contains("Settings")',
				placement: 'left',
				content: 'There are more configurations for the search results on the <b>Settings</b> page.',
			}, {
				path: '/settings',
				element: '[for="dexGen"]',
				placement: 'right',
				content: 'If you are playing one of the older games, you can ' +
					'narrow the list from the settings by picking a specific generation.',
			}, {
				path: '/settings',
				element: '[for="pokedexOrderBy"]',
				placement: 'right',
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

		// TODO if team is empty, add one to show the remove button
		tours.register({
			name: 'introToTeam',
			title: 'Your Team',
			steps: [{
				path: '/',
				element: '#teamList',
				placement: 'top',
				content: function () { return (team.length ? 'Looks like you are <em>teaming</em> with Pokédex friends.' : 'Looks like you still need a team.'); },
			}, {
				path: '/',
				element: '#teamList',
				placement: 'top',
				content: 'Your team is the set of Pokémon that you take with you on your adventure.',
			}, {
				path: '/',
				element: '.navbar-nav li:contains("Your Team")',
				placement: 'bottom',
				content: 'You can add Pokémon to (and remove Pokémon from) your team using the <b>Your Team</b> page.',
			}, {
				path: '/team',
				element: 'header span:contains("Your Team")',
				placement: 'right',
				content: 'In the top section, you can see your current set of Pokémon.',
			}, {
				path: '/team',
				element: 'header span:contains("Add to your team")',
				placement: 'right',
				content: 'In the bottom section, you can search for other Pokémon to add.',
			}, {
				path: '/team',
				element: '.navbar-nav li:contains("Pokédex")',
				placement: 'bottom',
				content: 'Once you have your team ready, you can search for contenders using the <b>Pokédex</b> page.',
			}, {
				path: '/pokedex/Bulbasaur',
				element: 'header:contains(Defending)',
				placement: 'top',
				content: 'You can see how your team with fair against a specific Pokémon.',
			}],
		});
	}
});