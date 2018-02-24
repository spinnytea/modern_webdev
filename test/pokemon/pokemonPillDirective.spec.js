define([
	'angular',
	'src/pokedex/pokedexModule',
	'angular-mocks',
], function (angular, pokedexModule) {
	return describe('Pokemon Pill Directive', function () {
		var localStorageService = jasmine.createSpyObj('localStorageService', ['get']);
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
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

		xdescribe('template', function () {
			var $rootScope, $compile;
			var element;
			beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_){
				// The injector unwraps the underscores (_) from around the parameter names when matching
				$compile = _$compile_;
				$rootScope = _$rootScope_;
				element = $compile('<i pokemon-pill="thingy"></i>')($rootScope);
			}));

			it('spot check values', function () {
				$rootScope.thingy = { name: 'Thing' };
				$rootScope.$digest();
				expect(element.attr('href')).toBe('http://bulbapedia.bulbagarden.net/wiki/Thing_(Pok%C3%A9mon)');

				$rootScope.thingy = { name: 'Foo' };
				$rootScope.$digest();
				expect(element.attr('href')).toBe('http://bulbapedia.bulbagarden.net/wiki/Foo_(Pok%C3%A9mon)');
			});
		}); // end template
	}); // end Pokemon Pill Directive
});