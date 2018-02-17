define([], function () {
	return [
		PageHeaderDirective,
	];

	function PageHeaderDirective() {
		return {
			restrict: 'A',
			scope: true,
			templateUrl: 'site/pageHeader.html',
			controller: [
				'$scope', '$location',
				PageHeaderController,
			],
		};
	}

	function PageHeaderController($scope, $location) {
		$scope.isActive = function (viewLocation) {
			return viewLocation === $location.path();
		};
	}
});