define([
	'angular',
	'lodash',
	'src/types/types',
	'angular-mocks',
], function (
	angular,
	_,
	typesModule
) {
	return describe('po_ke_type.types.factory', function () {
		var types;
		beforeEach(angular.mock.module(typesModule.name));
		beforeEach(angular.mock.inject(['po_ke_type.types.factory', function (_types_) {
			types = _types_;
		}]));

		it('init', function () {
			// NOTE if this list changes, stub a test for the new one
			// - you don't need to implement the test, but at least stub it out
			expect(Object.keys(types)).toEqual(['chart', 'list', 'text']);
		});

		describe('chart', function () {
			it('spot check values', function () {
				expect(types.chart.normal.normal).toBe(1);
				expect(types.chart.fire.grass).toBe(2);
				expect(types.chart.electric.ground).toBe(0);
				expect(types.chart.bug.fairy).toBe(0.5);
				expect(types.chart.ice.ghost).toBe(1);
			});

			it('all unique multipliers', function () {
				expect(_.chain(types.chart)
					.values().map(_.values).flatten() // collect just the multipliers
					.uniq()
					.sort()
					.value()).toEqual([0, 0.5, 1, 2]);
			});
		}); // end chart

		describe('list', function () {
			it('values', function () {
				expect(types.list).toEqual([
					'normal', 'fire', 'water', 'electric', 'grass',
					'ice', 'fighting', 'poison', 'ground', 'flying',
					'psychic', 'bug', 'rock', 'ghost', 'dragon',
					'dark', 'steel', 'fairy',
				]);
			});
		}); // end list

		describe('text', function () {
			it('transform all types', function () {
				expect(_.keys(types.text)).toEqual(types.list);
			});

			it('spot check transform', function () {
				expect(types.text.normal).toEqual({ name: 'Normal', title: 'NOR' });
				expect(types.text.flying).toEqual({ name: 'Flying', title: 'FLY' });
				expect(types.text.fire).toEqual({ name: 'Fire', title: 'FIR' });
				expect(types.text.dark).toEqual({ name: 'Dark', title: 'DAR' });
				expect(types.text.ghost).toEqual({ name: 'Ghost', title: 'GHO' });
			});
		}); // end text
	}); // end po_ke_type.types.factory
});