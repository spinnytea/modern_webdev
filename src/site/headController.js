define([], function () {
	return [
		'$scope',
		HeadController,
	];

	function HeadController($scope) {
		$scope.theme = 'spacelab';
	}
});