define([
	'angular',
	'lodash',
	'src/pokedex/pokedexModule',
	'angular-mocks',
], function (angular, _, pokedexModule) {
	return describe('Pokedex Factory', function () {
		var pokedex, typesFactory;
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			typesFactory = { chart: undefined };
			$provide.value('po_ke_type.types.factory', typesFactory);
		}));
		beforeEach(angular.mock.inject(['po_ke_type.pokedex.factory', function (_pokedex_) {
			pokedex = _pokedex_;
		}]));

		it('init', function () {
			// NOTE if this list changes, stub a test for the new one
			// - you don't need to implement the test immediately, but at least stub it out
			expect(Object.keys(pokedex)).toEqual(['list', 'calculateMaxDamageRate']);
		});

		describe('list', function () {
			it('spot check values', function () {
				expect(pokedex.list[0]).toEqual(jasmine.objectContaining({
					number: 1,
					name: 'Bulbasaur',
					specialname: '',
					types: ['grass', 'poison'],
					typeStyle: 'grass-poison',
					linkLocal: '#/pokedex/Bulbasaur',
				}));
				expect(pokedex.list[1]).toEqual(jasmine.objectContaining({
					number: 2,
					name: 'Ivysaur',
					specialname: '',
					types: ['grass', 'poison'],
					typeStyle: 'grass-poison',
					linkLocal: '#/pokedex/Ivysaur',
				}));
				expect(pokedex.list[2]).toEqual(jasmine.objectContaining({
					number: 3,
					name: 'Venusaur',
					specialname: '',
					types: ['grass', 'poison'],
					typeStyle: 'grass-poison',
					linkLocal: '#/pokedex/Venusaur',
				}));
				expect(pokedex.list[3]).toEqual(jasmine.objectContaining({
					number: 3,
					name: 'Venusaur',
					specialname: 'Mega Venusaur',
					types: ['grass', 'poison'],
					typeStyle: 'grass-poison',
					linkLocal: '#/pokedex/Venusaur/Mega%20Venusaur',
				}));
			});
		}); // end list

		it('calculateMaxDamageRate'); // end calculateMaxDamageRate
	}); // end Pokedex Factory
});