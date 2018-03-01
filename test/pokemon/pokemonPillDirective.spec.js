define([
	'angular',
	'src/pokedex/pokedexModule',
	'angular-mocks',
], function (angular, pokedexModule) {
	return describe('Pokemon Pill Directive', function () {
		var settingsFactory;
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			settingsFactory = {};
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
		}));

		describe('controller', function () {
			var $scope;
			beforeEach(angular.mock.inject(['$controller', function ($controller) {
				$scope = {};
				$controller('po_ke_type.types.pokemonPill.directive.controller', {
					'$scope': $scope,
				});
			}]));

			it('init', function () {
				expect(Object.keys($scope)).toEqual(['settings']);
			});
		}); // end controller

		it('template'); // end template
	}); // end Pokemon Pill Directive
});