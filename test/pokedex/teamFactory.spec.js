define([
	'angular',
	'lodash',
	'src/pokedex/pokedexModule',
], function (angular, _, pokedexModule) {
	describe('Team Factory', function () {
		it('init from storage', function () {
			angular.mock.module(pokedexModule.name, function ($provide) {
				var localStorageService = jasmine.createSpyObj('localStorageService', ['get']);
				localStorageService.get.and.returnValue([{ name: 'Mon 1' }]);
				var pokedexFactory = {
					list: [
						{ name: 'Mon 1', specialname: 'Special Mon 1', extra: 'data' },
					],
				};
				$provide.value('localStorageService', localStorageService);
				$provide.value('po_ke_type.pokedex.factory', pokedexFactory);
			});
			angular.mock.inject(['po_ke_type.pokedex.team.factory', '$rootScope', function (team) {
				expect(team).toEqual([{ name: 'Mon 1', specialname: 'Special Mon 1', extra: 'data' }]);
			}]);
		});
	}); // end Team Factory

	return describe('Team Factory', function () {
		var STORAGE_KEY = 'team_list';
		var team, $rootScope;
		var localStorageService, pokedexFactory;
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			localStorageService = jasmine.createSpyObj('localStorageService', ['get', 'set', 'remove']);
			pokedexFactory = {
				list: [
					{ name: 'Mon 1', specialname: 'Special Mon 1', extra: 'data' },
				],
			};
			$provide.value('localStorageService', localStorageService);
			$provide.value('po_ke_type.pokedex.factory', pokedexFactory);
		}));
		beforeEach(angular.mock.inject(['po_ke_type.pokedex.team.factory', '$rootScope', function (_team_, _$rootScope_) {
			team = _team_;
			$rootScope = _$rootScope_;
		}]));

		it('init empty', function () {
			expect(Object.keys(team)).toEqual([]);
			expect(localStorageService.get).toHaveBeenCalledWith(STORAGE_KEY);
		});

		it('on change', function () {
			expect(localStorageService.set).not.toHaveBeenCalled();
			expect(localStorageService.remove).not.toHaveBeenCalled();

			// save with data
			team.push(pokedexFactory.list[0]);
			$rootScope.$digest();
			expect(localStorageService.set).toHaveBeenCalledWith(STORAGE_KEY, [
				{ name: 'Mon 1', specialname: 'Special Mon 1' },
			]);
			expect(localStorageService.remove).not.toHaveBeenCalled();

			// remove when empty
			team.splice(0);
			$rootScope.$digest();
			expect(localStorageService.remove).toHaveBeenCalledWith(STORAGE_KEY);
		});

		it('clear when deleted', function () {
			// setup
			team.push(pokedexFactory.list[0]);
			$rootScope.$digest();
			expect(team.length).toBe(1);
			expect(localStorageService.remove).not.toHaveBeenCalled();

			// delete something else
			$rootScope.$broadcast('LocalStorageModule.notification.removeitem', { key: 'not_' + STORAGE_KEY });
			$rootScope.$digest();
			expect(team.length).toBe(1);
			expect(localStorageService.remove).not.toHaveBeenCalled();

			// delete
			$rootScope.$broadcast('LocalStorageModule.notification.removeitem', { key: STORAGE_KEY });
			$rootScope.$digest();
			expect(team.length).toBe(0);
			expect(localStorageService.remove).toHaveBeenCalled();
		});
	}); // end Team Factory
});