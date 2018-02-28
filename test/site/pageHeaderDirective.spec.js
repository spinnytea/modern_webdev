define([
	'angular',
	'src/site/siteModule',
	'angular-mocks',
], function (angular, siteModule) {
	return describe('Page Header Directive', function () {
		var $location;
		beforeEach(angular.mock.module('setup.js'));
		beforeEach(angular.mock.module(siteModule.name, function ($provide) {
			$location = jasmine.createSpyObj('$location', ['path']);
			$location.path.and.returnValue('/types');
			$provide.value('$location', $location);
		}));

		describe('controller', function () {
			var $scope = {};
			beforeEach(angular.mock.inject(['$controller', function ($controller) {
				$controller('po_ke_type.site.pageHeader.directive.controller', {
					'$scope': $scope,
				});
			}]));

			it('isActive', function () {
				expect($scope.isActive('/types')).toBe(true);
				expect($scope.isActive('/settings')).toBe(false);
			});
		}); // end controller

		it('template'); // end template
	}); // end Page Header Directive
});