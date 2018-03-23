define([
	'angular',
	'src/site/siteModule',
	'angular-mocks',
], function (angular, siteModule) {
	return describe('Settings Controller', function () {
		var localStorageService, settingsFactory, teamFactory;
		beforeEach(angular.mock.module(siteModule.name, function ($provide) {
			localStorageService = jasmine.createSpyObj('localStorageService', ['clearAll']);
			settingsFactory = {};
			teamFactory = [1, 2];
			$provide.value('localStorageService', localStorageService);
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
			$provide.value('po_ke_type.pokedex.team.factory', teamFactory);
		}));

		describe('controller', function () {
			var $scope;
			beforeEach(angular.mock.inject(function ($controller) {
				$scope = {};
				$controller('po_ke_type.site.settings.controller', {
					'$scope': $scope,
				});
			}));

			it('init', function () {
				expect($scope.settings).toBe(settingsFactory);
				expect(Object.keys($scope).sort()).toEqual([
					'clearLocalStorage',
					'clearTeam',
					'settings',
					'team',
				]);
			});

			it('clearTeam', function () {
				expect(teamFactory.length).toBe(2);

				$scope.clearTeam();

				expect(teamFactory.length).toBe(0);
			});

			it('clearLocalStorage', function () {
				expect(localStorageService.clearAll).not.toHaveBeenCalled();

				$scope.clearLocalStorage();

				expect(localStorageService.clearAll).toHaveBeenCalled();
			});
		}); // end controller
	}); // end Settings Controller
});