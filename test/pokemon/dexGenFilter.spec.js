define([
	'angular',
	'lodash',
	'src/pokedex/pokedexModule',
	'angular-mocks',
], function (angular, _, pokedexModule) {
	return describe('Dex Gen Filter', function () {
		var dexGen, localStorageService;
		var array = _.fill(new Array(750), null).map(function (v, idx) {
			return { number: idx+1 };
		});
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			localStorageService = jasmine.createSpyObj('localStorageService', ['get']);
			$provide.value('localStorageService', localStorageService);
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

			localStorageService.get.and.returnValue(6);
			expect(dexGen(arrayWithMegas).length).toBe(721); // all the mons!
			localStorageService.get.and.returnValue(5);
			expect(dexGen(arrayWithMegas).length).toBe(324); // skip a few (about half)
		});

		describe('config', function () {
			it('none', function () {
				localStorageService.get.and.returnValue(undefined);
				expect(dexGen(array).length).toBe(721);
			});

			it('6', function () {
				localStorageService.get.and.returnValue(6);
				expect(dexGen(array).length).toBe(721);
			});

			it('5', function () {
				localStorageService.get.and.returnValue(5);
				expect(dexGen(array).length).toBe(649);
			});

			it('4', function () {
				localStorageService.get.and.returnValue(4);
				expect(dexGen(array).length).toBe(494);
			});

			it('3', function () {
				localStorageService.get.and.returnValue(3);
				expect(dexGen(array).length).toBe(386);
			});

			it('2', function () {
				localStorageService.get.and.returnValue(2);
				expect(dexGen(array).length).toBe(251);
			});

			it('1', function () {
				localStorageService.get.and.returnValue(1);
				expect(dexGen(array).length).toBe(151);
			});

			it('0', function () {
				// this isn't supposed to be selectable
				// but 0 will mean 'all' like undefined
				localStorageService.get.and.returnValue(0);
				expect(dexGen(array).length).toBe(721);
			});
		}); // end config
	}); // end Dex Gen Filter
});