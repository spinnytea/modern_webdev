define([], function () {
	return [SquareDirective];

	function SquareDirective() {
		return {
			restrict: 'A',
			replace: true,
			scope: { type: '=typeSquare' },
			templateUrl: 'types/squareDirective.html',
			controller: ['$scope', 'po_ke_type.types.factory', SquareController],
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