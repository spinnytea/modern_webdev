define(['angular'], function (angular) {
	var radioGroupDirectiveMod = angular.module('po_ke_type.utils.radioGroup.directive', []);

	radioGroupDirectiveMod.directive('radioGroup', [RadioGroupDirective]);

	radioGroupDirectiveMod.controller('po_ke_type.utils.radioGroup.directive.controller', [
		'$scope',
		RadioGroupController,
	]);

	return radioGroupDirectiveMod;

	function RadioGroupDirective() {
		return {
			require: 'ngModel',
			restrict: 'A',
			scope: {
				options: '=radioGroup',
				ngModel: '=',
			},
			templateUrl: 'utils/radioGroupDirective.html',
			controller: 'po_ke_type.utils.radioGroup.directive.controller',
		};
	}

	function RadioGroupController($scope) {
		$scope.isSelected = function (id) { return $scope.ngModel === id; };
		$scope.select = function (id) { return $scope.ngModel = id; };
	}
});