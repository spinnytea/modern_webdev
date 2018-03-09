define(['angular'], function (angular) {
	var tourStartMod = angular.module('po_ke_type.utils.tourStart.directive', []);

	tourStartMod.directive('tourStart', [TourStartDirective]);

	tourStartMod.controller('po_ke_type.utils.tourStart.directive.controller', [
		'$scope', 'po_ke_type.utils.tours.factory',
		TourStartController,
	]);

	return tourStartMod;

	// REVIEW what if the provided name isn't a tour? ngHide?
	function TourStartDirective() {
		return {
			restrict: 'A',
			replace: 'true',
			scope: { name: '@tourStart' },
			template: '<i class="fa fa-question-circle" ng-click="start()"></i>',
			controller: 'po_ke_type.utils.tourStart.directive.controller',
		};
	}

	function TourStartController($scope, tours) {
		$scope.start = function () {
			tours.start($scope.name);
		};
	}
});