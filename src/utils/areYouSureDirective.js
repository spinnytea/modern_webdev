define(['angular'], function (angular) {
	var areYouSureMod = angular.module('po_ke_type.utils.areYouSure.directive', []);

	areYouSureMod.directive('areYouSure', [AreYouSureDirective]);

	areYouSureMod.controller('po_ke_type.utils.areYouSure.directive.controller', [
		'$scope', '$q', '$timeout',
		AreYouSureController,
	]);

	return areYouSureMod;

	function AreYouSureDirective() {
		return {
			restrict: 'A',
			replace: true,
			transclude: true,
			// if possible, the callback should return a promise
			scope: { callback: '@areYouSure' },
			templateUrl: 'utils/areYouSureDirective.html',
			controller: 'po_ke_type.utils.areYouSure.directive.controller',
		};
	}

	function AreYouSureController($scope, $q, $timeout) {
		// step 1: idle
		// step 2: are you sure?
		// step 3: working (doing the thing)
		// step 4: done
		// step 5: error
		$scope.step = 1;

		// go back to start (can't reset if currently doing the thing)
		$scope.reset = function () { if($scope.step !== 3) $scope.step = 1; };

		// call to advance forward
		$scope.theCheck = function () {
			if($scope.step === 1) {
				$scope.step = 2;
			}
			else if($scope.step === 2) {
				$scope.step = 3;
				// promisify the callback
				// use timeout in case callback is long and blocking
				$timeout(function () {
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