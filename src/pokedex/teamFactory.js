define(['lodash'], function (_) {
	var STORAGE_KEY = 'team_list';

	return [
		'$rootScope', 'localStorageService', 'po_ke_type.pokedex.factory',
		TeamFactory,
	];

	function TeamFactory($rootScope, localStorageService, pokedex) {
		var team = [];

		team = localStorageService.get(STORAGE_KEY);

		// restore list from pokedex
		if(team) {
			team = team.map(function (m) { return _.find(pokedex.list, m); });
		}
		// init list
		else {
			team = [];
		}

		// watch for changes in the list
		$rootScope.$watch(function () { return team.length; }, function () {
			if(team.length) {
				localStorageService.set(STORAGE_KEY, team.map(function (mon) {
					return _.pick(mon, 'name', 'specialname');
				}));
			}
			else {
				localStorageService.remove(STORAGE_KEY);
			}
		});

		// watch for the list to be removed from local storage
		$rootScope.$on('LocalStorageModule.notification.removeitem', function (event, args) {
			if(args.key === STORAGE_KEY) {
				team.splice(0);
			}
		});

		return team;
	}
});