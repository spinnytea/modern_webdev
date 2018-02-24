define([
	'angular',
	'src/pokedex/pokedexModule',
	'angular-mocks',
], function (angular, pokedexModule) {
	return describe('Pokedex Controller', function () {
		var $scope;
		var pokedexFactory = { list: ['1234'] };
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			$provide.value('po_ke_type.pokedex.factory', pokedexFactory);
		}));
		beforeEach(angular.mock.inject(['$controller', function ($controller) {
			$scope = {};
			$controller('po_ke_type.pokedex.controller', {
				'$scope': $scope,
			});
		}]));

		describe('controller', function () {
			it('init', function () {
				expect($scope.dex).toBe(pokedexFactory.list);
				expect($scope.nested.limit).toBe(20);
			});
		}); // end controller

		it('template'); // end template
	}); // end Pokedex Controller
});