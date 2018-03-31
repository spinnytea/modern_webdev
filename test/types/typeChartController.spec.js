define([
	'angular',
	'lodash',
	'src/types/typesModule',
], function (angular, _, typesModule) {
	return describe('Type Chart Controller', function () {
		var settingsFactory;
		beforeEach(angular.mock.module(typesModule.name, function ($provide) {
			settingsFactory = {
				preferredTypeChart: 'chart1',
				availableTypeCharts: [
					{ id: 'chart1', display: 'Chart 1' },
					{ id: 'chart2', display: 'Chart 2' },
					{ id: 'chart3', display: 'Chart 3' },
				],
			};
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
		}));

		describe('controller', function () {
			var $scope;
			beforeEach(angular.mock.inject(function ($controller) {
				$scope = {};
				$controller('po_ke_type.types.chart.controller', {
					'$scope': $scope,
				});
			}));

			it('init', function () {
				expect($scope.whichChart).toBe('chart1');
				expect($scope.chartName).toBe('Chart 1');
				expect($scope.availableTypeCharts).toBe(settingsFactory.availableTypeCharts);
				expect(Object.keys($scope)).toContain('types');
				expect(Object.keys($scope)).toContain('text');
			});

			it('pickChart', function () {
				expect($scope.whichChart).toBe('chart1');
				expect($scope.chartName).toBe('Chart 1');

				$scope.pickChart('chart2');

				expect($scope.whichChart).toBe('chart2');
				expect($scope.chartName).toBe('Chart 2');
			});
		}); // end controller

		describe('template', function () {
			var $scope, element;
			beforeEach(angular.mock.inject(function ($compile, $controller, $templateCache, $rootScope) {
				$scope = $rootScope.$new();
				$controller('po_ke_type.types.chart.controller', {
					'$scope': $scope,
				});
				// HACK why do we have to wrap the templateCache in a div, but we don't need to for pokedex.html?
				element = $compile('<div>' + $templateCache.get('types/types.html') + '</div>')($scope);
				$scope.$digest();
			}));

			it('init', function () {
				expect($scope.whichChart).toBe('chart1');
				expect(element.find('h1 span')).toHaveText('Chart 1');
				expect(element.find('h1 small:nth(0) a')).toHaveText('Chart 2');
				expect(element.find('h1 small:nth(1) a')).toHaveText('Chart 3');
			});

			it('change whichChart', function () {
				element.find('h1 small a:contains("Chart 2")').trigger('click');

				expect($scope.whichChart).toBe('chart2');
				expect(element.find('h1 span')).toHaveText('Chart 2');
				expect(element.find('h1 small:nth(0) a')).toHaveText('Chart 1');
				expect(element.find('h1 small:nth(1) a')).toHaveText('Chart 3');
			});
		}); // end template
	}); // end Type Chart Controller
});