define(['angular', 'lodash'], function (angular, _) {
	var btnStateMessageMod = angular.module('po_ke_type.utils.btnStateMessage.directive', []);

	btnStateMessageMod.directive('btnStateMessage', [BtnStateMessageDirective]);

	btnStateMessageMod.controller('po_ke_type.utils.btnStateMessage.directive.controller', [
		'$scope', '$q', '$timeout',
		BtnStateMessageController,
	]);

	return btnStateMessageMod;

	function BtnStateMessageDirective() {
		return {
			restrict: 'A',
			replace: true,
			transclude: true,
			// if possible, the callback should return a promise
			scope: { callback: '@btnStateMessage' },
			templateUrl: 'utils/btnStateMessageDirective.html',
			controller: 'po_ke_type.utils.btnStateMessage.directive.controller',
		};
	}

	function BtnStateMessageController($scope, $q, $timeout) {
		// step 1: idle
		// step 2: working (doing the thing)
		// step 3: done
		// step 4: error
		$scope.step = 1;

		// go back to start (can't reset if currently doing the thing)
		$scope.reset = function () { if($scope.step !== 2) $scope.step = 1; };

		// call to advance forward
		$scope.theCheck = function () {
			if($scope.step === 1) {
				$scope.step = 2;
				// promisify the callback
				// use timeout in case callback is long and blocking
				$timeout(function () {
					try {
						return $scope.$parent.$eval($scope.callback);
					}
					catch(e) {
						return $q.reject(e);
					}
				}).then(function (result) {
					$scope.step = 3;
					$scope.msg = (_.isString(result) ? result : 'Done');
				}).catch(function (result) {
					$scope.step = 4;
					$scope.msg = (_.isError(result) ? result.message : 'Error');
				});
			}
		};
	}
});