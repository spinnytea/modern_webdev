define(['lodash'], function (_) {
	return [
		'$scope', 'localStorageService', 'bindKeys',
		'po_ke_type.pokedex.factory', 'po_ke_type.pokedex.team.factory',
		TeamController,
	];

	function TeamController($scope, localStorageService, bindKeys,
			pokedex, team) {
		$scope.colorfulCards = localStorageService.get('colorfulCards');
		$scope.nested = { filter: '', filteredDex: undefined };
		$scope.showList = function () { return $scope.nested.filter.length > 1; };
		$scope.dex = pokedex.list;
		$scope.team = team;

		$scope.isInTeam = function (mon) {
			return _.includes($scope.team, mon);
		};
		$scope.addToTeam = function (mon) {
			if(!_.includes($scope.team, mon)) $scope.team.push(mon);
		};
		$scope.removeFromTeam = function (mon) {
			_.pull($scope.team, mon);
		};

		function getFilteredList() {
			// get the currently filtered list
			var list = $scope.showList()?$scope.nested.filteredDex:[];

			// check for exact matches (there aren't many)
			var filter = $scope.nested.filter.toLowerCase();
			var exactList = list.filter(function (mon) { return mon.name.toLowerCase() === filter; });
			if(exactList.length) return exactList;

			// if no exact matches, then return the full list
			return list;
		}
		function addAll() {
			getFilteredList().forEach($scope.addToTeam);
		}
		function removeAll() {
			getFilteredList().forEach($scope.removeFromTeam);
		}

		bindKeys($scope, {
			'enter': addAll,
			'esc': removeAll,
		});
	}
});