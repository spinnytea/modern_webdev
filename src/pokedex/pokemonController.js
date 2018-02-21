define(['lodash'], function (_) {
	return [
		'$scope', '$routeParams', 'po_ke_type.pokedex.factory', 'po_ke_type.pokedex.team.factory',
		PokemonController,
	];

	function PokemonController($scope, $routeParams, pokedex, team) {
		var name = ($routeParams.name || '').toLowerCase();
		var specialname = (decodeURI($routeParams.specialname || '')).toLowerCase();
		// show evolutions? no, not unless we can get a source that's super succinct
		// attack types? no, this gets complicated very quickly

		$scope.mon = _.find(pokedex.list, function (mon) {
			return mon.name.toLowerCase() === name && mon.specialname.toLowerCase() === specialname;
		});
		// TODO if ! mon, do something better than inline oops
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