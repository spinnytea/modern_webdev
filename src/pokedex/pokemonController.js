define(['lodash'], function (_) {
	return [
		'$scope', '$routeParams', 'po_ke_type.pokedex.factory', 'po_ke_type.types.factory', 'po_ke_type.pokedex.team.factory',
		PokemonController,
	];

	function PokemonController($scope, $routeParams, pokedex, types, team) {
		var name = ($routeParams.name || '').toLowerCase();
		var specialname = (decodeURI($routeParams.specialname || '')).toLowerCase();
		// show evolutions? no, not unless we can get a source that's super succinct
		// attack types? no, this gets complicated very quickly

		$scope.mon = _.find(pokedex.list, function (mon) {
			return mon.name.toLowerCase() === name && mon.specialname.toLowerCase() === specialname;
		});
		// TODO if ! mon, do something better than inline oops

		// when MON is attacking
		$scope.attacking = team.map(function (m) {
			var rate = calculateMaxDamageRate($scope.mon, m, types.chart);
			return _.assign({ rate: rate }, m);
		});
		// when MON is defending
		$scope.defending = team.map(function (m) {
			var rate = calculateMaxDamageRate(m, $scope.mon, types.chart);
			return _.assign({ rate: rate }, m);
		});
	}

	// TODO move this into pokedex.factory
	function calculateMaxDamageRate(atk, def, chart) {
		return atk.types.reduce(function (max, atk_type) {
			var rate = def.types.reduce(function (r, def_type) {
				return r * chart[atk_type][def_type];
			}, 1);
			return Math.max(max, rate);
		}, 0);
	}
});