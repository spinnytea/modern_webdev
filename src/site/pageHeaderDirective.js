define(['angular'], function (angular) {
	var pageHeaderDirectiveMod = angular.module('po_ke_type.site.pageHeader.directive', []);

	pageHeaderDirectiveMod.directive('pageHeader', [PageHeaderDirective]);

	pageHeaderDirectiveMod.controller('po_ke_type.site.pageHeader.directive.controller', [
		'$scope', '$location',
		PageHeaderController,
	]);

	return pageHeaderDirectiveMod;

	function PageHeaderDirective() {
		return {
			restrict: 'A',
			scope: true,
			templateUrl: 'site/pageHeaderDirective.html',
			controller: 'po_ke_type.site.pageHeader.directive.controller',
		};
	}

	function PageHeaderController($scope, $location) {
		$scope.isActive = function (viewLocation) {
			return viewLocation === $location.path();
		};
	}
});