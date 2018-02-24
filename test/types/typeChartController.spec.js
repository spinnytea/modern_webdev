define([
	'angular',
	'lodash',
	'src/types/typesModule',
	'angular-mocks',
], function (angular, _, typesModule) {
	return describe('Type Chart Controller', function () {
		var settingsFactory = {
			preferredTypeChart: 'chart1',
			availableTypeCharts: [
				{ id: 'chart1', display: 'Chart 1' },
				{ id: 'chart2', display: 'Chart 2' },
			],
		};
		beforeEach(angular.mock.module(typesModule.name, function ($provide) {
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
		}));

		describe('controller', function () {
			var $scope;
			beforeEach(angular.mock.inject(['$controller', function ($controller) {
				$scope = {};
				$controller('po_ke_type.types.chart.controller', {
					'$scope': $scope,
				});
			}]));

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

		it('template'); // end template
	}); // end Type Chart Controller
});