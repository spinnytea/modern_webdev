define([
	'angular',
	'src/pokedex/pokedexModule',
	'angular-mocks',
], function (angular, pokedexModule) {
	return describe('Pokemon Pill Directive', function () {
		var localStorageService;
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			localStorageService = jasmine.createSpyObj('localStorageService', ['get']);
			$provide.value('localStorageService', localStorageService);
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
				expect(Object.keys($scope)).toEqual(['colorfulCards']);
			});
		}); // end controller

		it('template'); // end template
	}); // end Pokemon Pill Directive
});