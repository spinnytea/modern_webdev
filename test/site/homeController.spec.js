define([
	'angular',
	'src/site/siteModule',
], function (angular, siteModule) {
	return describe('Home Controller', function () {
		var teamFactory, pokedexFactory, settingsFactory, typesFactory;
		beforeEach(angular.mock.module(siteModule.name, function ($provide) {
			teamFactory = [0];
			pokedexFactory = { list: [0, 1] };
			settingsFactory = { themes: [0, 1, 2] };
			typesFactory = { list: [0, 1, 2, 3] };
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
			$provide.value('po_ke_type.pokedex.team.factory', teamFactory);
			$provide.value('po_ke_type.pokedex.factory', pokedexFactory);
			$provide.value('po_ke_type.types.factory', typesFactory);
		}));

		describe('controller', function () {
			var $scope;
			beforeEach(angular.mock.inject(function ($controller) {
				$scope = {};
				$controller('po_ke_type.site.home.controller', {
					'$scope': $scope,
				});
			}));

			it('init', function () {
				expect($scope.themeCount).toBe(3);
				expect($scope.typeCount).toBe(4);
				expect($scope.pokedexCount).toBe(2);
				expect($scope.team).toBe(teamFactory);
			});
		}); // end controller

		it('template'); // end template
	}); // end Home Controller
});