define([
	'angular',
	'lodash',
	'src/pokedex/pokedexModule',
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
			// if this list changes, stub a test for the new one
			// - you don't need to implement the test immediately, but at least stub it out
			expect(Object.keys(pokedex).sort()).toEqual(['calculateMaxDamageRate', 'list']);
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

		describe('calculateMaxDamageRate', function () {
			describe('rock, paper, scissor', function () {
				function check(atk, def, result) {
					expect(pokedex.calculateMaxDamageRate({ types: atk }, { types: def })).toBe(result);
				}
				beforeEach(function () {
					typesFactory.chart = {
						rock: { rock: 1, paper: 0.5, scissor: 2 },
						paper: { rock: 2, paper: 1, scissor: 0.5 },
						scissor: { rock: 0.5, paper: 2, scissor: 1 },
					};
				});

				it('sanity check', function () {
					check(['rock'], ['rock'], 1);
					check(['rock'], ['paper'], 0.5);
					check(['rock'], ['scissor'], 2);
				});

				it('defending type has multiplicative effect', function () {
					check(['rock'], ['paper', 'paper'], 0.25);
					check(['rock'], ['scissor', 'scissor'], 4);
				});

				it('attacking type looks for best outcome', function () {
					check(['rock', 'rock'], ['paper'], 0.5);
					check(['rock', 'scissor'], ['paper'], 2);
				});
			}); // end rock, paper, scissor
		}); // end calculateMaxDamageRate
	}); // end Pokedex Factory
});