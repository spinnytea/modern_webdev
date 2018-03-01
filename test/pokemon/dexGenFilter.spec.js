define([
	'angular',
	'lodash',
	'src/pokedex/pokedexModule',
	'angular-mocks',
], function (angular, _, pokedexModule) {
	return describe('Dex Gen Filter', function () {
		var dexGen, settingsFactory;
		var array = _.fill(new Array(750), null).map(function (v, idx) {
			return { number: idx+1 };
		});
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			settingsFactory = { dexGen: 6 };
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
		}));
		beforeEach(angular.mock.inject(['$filter', function ($filter) {
			dexGen = $filter('dexGen');
		}]));

		it('invalid argument', function () {
			expect(dexGen()).toEqual([]);
			expect(dexGen(NaN)).toEqual([]);
			expect(dexGen([])).toEqual([]); // technically this is valid here
			expect(dexGen({})).toEqual([]);
			expect(dexGen('')).toEqual([]);
			expect(dexGen(/,/)).toEqual([]);
		});

		it('filter out Mega', function () {
			var arrayWithMegas = _.cloneDeep(array);
			arrayWithMegas.forEach(function (mon) {
				if(mon.number % 2) mon.specialname = 'Mega something ' + mon.number;
			});

			settingsFactory.dexGen = 6;
			expect(dexGen(arrayWithMegas).length).toBe(721); // all the mons!
			settingsFactory.dexGen = 5;
			expect(dexGen(arrayWithMegas).length).toBe(324); // skip a few (about half)
		});

		describe('config', function () {
			it('6', function () {
				settingsFactory.dexGen = 6;
				expect(dexGen(array).length).toBe(721);
			});

			it('5', function () {
				settingsFactory.dexGen = 5;
				expect(dexGen(array).length).toBe(649);
			});

			it('4', function () {
				settingsFactory.dexGen = 4;
				expect(dexGen(array).length).toBe(494);
			});

			it('3', function () {
				settingsFactory.dexGen = 3;
				expect(dexGen(array).length).toBe(386);
			});

			it('2', function () {
				settingsFactory.dexGen = 2;
				expect(dexGen(array).length).toBe(251);
			});

			it('1', function () {
				settingsFactory.dexGen = 1;
				expect(dexGen(array).length).toBe(151);
			});
		}); // end config
	}); // end Dex Gen Filter
});