define([
	'angular',
	'src/pokedex/pokedexModule',
	'test/pokemon/pokedexFactory.mock',
	'angular-mocks',
], function (angular, pokedexModule, pokedexFactoryMock) {
	return describe('Bulbapedia Directive', function () {
		beforeEach(angular.mock.module(pokedexModule.name));

		describe('template', function () {
			var $scope, element;
			beforeEach(angular.mock.inject(function ($compile, $rootScope){
				// The injector unwraps the underscores (_) from around the parameter names when matching
				$scope = $rootScope;
				element = $compile('<i bulbapedia="mon"></i>')($scope);
				$scope.mon = pokedexFactoryMock.list.Bulbasaur;
			}));

			it('spot check values', function () {
				$scope.$digest();
				expect(element.attr('href')).toBe('http://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)');

				$scope.mon = pokedexFactoryMock.list.Charmander;
				$scope.$digest();
				expect(element.attr('href')).toBe('http://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)');
			});
		}); // end template
	}); // end Bulbapedia Directive
});