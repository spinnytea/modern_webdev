define([
	'angular',
	'src/site/siteModule',
	'angular-mocks',
], function (angular, siteModule) {
	return describe('Page Header Directive', function () {
		var $location;
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

		describe('template', function () {
			var $scope, element;
			beforeEach(angular.mock.inject(function ($compile, $rootScope){
				// The injector unwraps the underscores (_) from around the parameter names when matching
				$scope = $rootScope;
				element = $compile('<div page-header=""></div>')($scope);
				$scope.$digest();
			}));

			describe('active', function () {
				it('init', function () {
					var headerLocations = element.find('.navbar-nav li')
						.map(function (idx, el) { return el.innerText; })
						.toArray()
						.sort();

					// NOTE if this list changes, stub a test for the new one
					// - you don't need to implement the test immediately, but at least stub it out
					expect(headerLocations).toEqual([
						'Pokédex',
						'Settings',
						'Type Chart',
						'Your Team',
					]);
				});

				it('pokedex', function () {
					$location.path.and.returnValue('/pokedex');
					$scope.$digest();
					expect(element.find('.navbar-nav li:contains("Pokédex")')).toHaveClass('active');
				});

				it('settings', function () {
					$location.path.and.returnValue('/settings');
					$scope.$digest();
					expect(element.find('.navbar-nav li:contains("Settings")')).toHaveClass('active');
				});

				it('types', function () {
					$location.path.and.returnValue('/types');
					$scope.$digest();
					expect(element.find('.navbar-nav li:contains("Type Chart")')).toHaveClass('active');
				});

				it('team', function () {
					$location.path.and.returnValue('/team');
					$scope.$digest();
					expect(element.find('.navbar-nav li:contains("Your Team")')).toHaveClass('active');
				});
			}); // end active
		}); // end template
	}); // end Page Header Directive
});