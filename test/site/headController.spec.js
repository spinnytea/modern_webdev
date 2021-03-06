define([
	'angular',
	'src/site/siteModule',
], function (angular, siteModule) {
	return describe('Head Controller', function () {
		var settingsFactory;
		beforeEach(angular.mock.module(siteModule.name, function ($provide) {
			settingsFactory = {};
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
		}));

		describe('controller', function () {
			var $scope;
			beforeEach(angular.mock.inject(function ($controller) {
				$scope = {};
				$controller('po_ke_type.site.head.controller', {
					'$scope': $scope,
				});
			}));

			it('init', function () {
				expect($scope.settings).toBe(settingsFactory);
			});
		}); // end controller
	}); // end Head Controller
});