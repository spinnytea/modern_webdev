define([
	'angular',
	'src/pokedex/pokedexModule',
	'angular-mocks',
], function (angular, pokedexModule) {
	return describe('Bulbapedia Directive', function () {
		beforeEach(angular.mock.module(pokedexModule.name));

		it('controller'); // end controller

		describe('template', function () {
			var $rootScope, $compile;
			var element;
			beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_){
				// The injector unwraps the underscores (_) from around the parameter names when matching
				$compile = _$compile_;
				$rootScope = _$rootScope_;
				element = $compile('<i bulbapedia="thingy"></i>')($rootScope);
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
	}); // end Bulbapedia Directive
});