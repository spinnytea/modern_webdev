define(['angular'], function (angular) {
	var tourStartMod = angular.module('po_ke_type.utils.tourStart.directive', []);

	tourStartMod.directive('tourStart', [TourStartDirective]);

	tourStartMod.controller('po_ke_type.utils.tourStart.directive.controller', [
		'$scope', 'po_ke_type.utils.tours.factory', 'po_ke_type.site.settings.factory',
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

	function TourStartController($scope, tours, settings) {
		$scope.start = function () {
			tours.start($scope.name);
		};

		// TODO disable tour when offline (protocol === file)
		$scope.show = function () {
			return settings.showTourStart && tours.exists($scope.name);
		};
	}
});