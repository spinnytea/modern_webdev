define([
	'angular',
	'src/site/siteModule',
	'angular-mocks',
], function (angular, siteModule) {
	return describe('Settings Controller', function () {
		var localStorageService, settingsFactory;
		beforeEach(angular.mock.module('setup.js'));
		beforeEach(angular.mock.module(siteModule.name, function ($provide) {
			localStorageService = jasmine.createSpyObj('localStorageService', ['clearAll']);
			settingsFactory = {};
			$provide.value('localStorageService', localStorageService);
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
		}));

		describe('controller', function () {
			var $scope;
			beforeEach(angular.mock.inject(['$controller', function ($controller) {
				$scope = {};
				$controller('po_ke_type.site.settings.controller', {
					'$scope': $scope,
				});
			}]));

			it('init', function () {
				expect($scope.settings).toBe(settingsFactory);
				expect(Object.keys($scope)).toEqual(['settings', 'clearLocalStorage']);
			});

			it('clearLocalStorage', function () {
				expect(localStorageService.clearAll).not.toHaveBeenCalled();

				$scope.clearLocalStorage();

				expect(localStorageService.clearAll).toHaveBeenCalled();
			});
		}); // end controller

		it('template'); // end template
	}); // end Settings Controller
});