define(['lodash'], function (_) {
	return [
		'$scope', '$routeParams', 'po_ke_type.pokedex.factory', 'po_ke_type.pokedex.team.factory',
		PokemonController,
	];

	// XXX show evolutions? no, not unless we can get a source that's super succinct
	// XXX attack types? no, this gets complicated very quickly
	function PokemonController($scope, $routeParams, pokedex, team) {
		var name = _.toLower($routeParams.name);
		var specialname = _.toLower(decodeURI($routeParams.specialname || ''));
		$scope.mon = _.find(pokedex.list, function (mon) {
			return _.toLower(mon.name) === name && _.toLower(mon.specialname) === specialname;
		});
		if(!$scope.mon) return;

		// when MON is attacking
		$scope.attacking = team.map(function (m) {
			var rate = pokedex.calculateMaxDamageRate($scope.mon, m);
			return _.assign({ rate: rate }, m);
		});
		// when MON is defending
		$scope.defending = team.map(function (m) {
			var rate = pokedex.calculateMaxDamageRate(m, $scope.mon);
			return _.assign({ rate: rate }, m);
		});
	}
});