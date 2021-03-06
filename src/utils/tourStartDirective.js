define(['angular'], function (angular) {
	var tourStartMod = angular.module('po_ke_type.utils.tourStart.directive', []);

	tourStartMod.directive('tourStart', [TourStartDirective]);

	tourStartMod.controller('po_ke_type.utils.tourStart.directive.controller', [
		'$scope', '$location', 'po_ke_type.utils.tours.factory', 'po_ke_type.site.settings.factory',
		TourStartController,
	]);

	return tourStartMod;

	function TourStartDirective() {
		return {
			restrict: 'A',
			replace: 'true',
			scope: { name: '@tourStart' },
			template: '<i class="fa fa-question-circle" ng-click="start()" ng-show="show()"></i>',
			controller: 'po_ke_type.utils.tourStart.directive.controller',
		};
	}

	function TourStartController($scope, $location, tours, settings) {
		$scope.start = function () {
			tours.start($scope.name);
		};

		$scope.show = function () {
			return settings.showTourStart && $location.protocol() !== 'file' && tours.exists($scope.name);
		};
	}
});