define([], function () {
	return [
		'po_ke_type.utils.tours.factory',
		TypesToursSeup,
	];

	function TypesToursSeup(tours) {
		tours.register({
			name: 'introToTypes',
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
				element: '[for="preferredTypeChart"]',
				placement: 'right',
				content: 'You can change which type chart is displayed from the settings page.',
			}, {
				path: '/pokedex/Bulbasaur',
				element: '#typeSquares',
				placement: 'bottom',
				content: 'That said, the Pokémon page always uses type Squares.',
			}],
		});
	}
});