define(['angular'], function (angular) {
	var squareDirectiveMod = angular.module('po_ke_type.types.square.directive', []);

	squareDirectiveMod.directive('typeSquare', [SquareDirective]);

	// XXX ? po_ke_type.types.square.directive.controller
	squareDirectiveMod.controller('po_ke_type.types.square.controller', [
		'$scope', 'po_ke_type.types.factory',
		SquareController,
	]);

	return squareDirectiveMod;

	function SquareDirective() {
		return {
			restrict: 'A',
			replace: true,
			scope: { type: '=typeSquare' },
			templateUrl: 'types/squareDirective.html',
			controller: 'po_ke_type.types.square.controller',
		};
	}

	function SquareController($scope, types) {
		$scope.text = types.text;

		$scope.dmgTo200 = types.list.filter(function (t) { return types.chart[$scope.type][t] === 2; });
		$scope.dmgTo50 = types.list.filter(function (t) { return types.chart[$scope.type][t] === 0.5; });
		$scope.dmgTo0 = types.list.filter(function (t) { return types.chart[$scope.type][t] === 0; });

		$scope.dmgFrom200 = types.list.filter(function (t) { return types.chart[t][$scope.type] === 2; });
		$scope.dmgFrom50 = types.list.filter(function (t) { return types.chart[t][$scope.type] === 0.5; });
		$scope.dmgFrom0 = types.list.filter(function (t) { return types.chart[t][$scope.type] === 0; });
	}
});