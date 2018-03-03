define(['angular'], function (angular) {
	var areYouSureMod = angular.module('po_ke_type.utils.areYouSure.directive', []);

	areYouSureMod.directive('areYouSure', [AreYouSureDirective]);

	areYouSureMod.controller('po_ke_type.utils.areYouSure.directive.controller', [
		'$scope', '$q',
		AreYouSureController,
	]);

	return areYouSureMod;

	function AreYouSureDirective() {
		return {
			restrict: 'A',
			replace: true,
			transclude: true,
			scope: { callback: '@areYouSure' },
			templateUrl: 'utils/areYouSureDirective.html',
			controller: 'po_ke_type.utils.areYouSure.directive.controller',
		};
	}

	function AreYouSureController($scope, $q) {
		$scope.step = 1;
		$scope.reset = function () { if($scope.step !== 3) $scope.step = 1; };
		$scope.theCheck = function () {
			if($scope.step === 1) {
				$scope.step = 2;
			}
			else if($scope.step === 2) {
				$scope.step = 3;
				// promisify the callback
				$q.resolve().then(function () {
					try {
						return $scope.$parent.$eval($scope.callback);
					}
					catch(e) {
						return $q.reject(e);
					}
				}).then(function () {
					$scope.step = 4;
				}).catch(function () {
					$scope.step = 5;
				});
			}
		};
	}
});