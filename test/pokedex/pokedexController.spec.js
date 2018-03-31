define([
	'angular',
	'lodash',
	'src/pokedex/pokedexModule',
	'test/pokedex/pokedexFactory.mock',
], function (angular, _, pokedexModule, pokedexFactoryMock) {
	return describe('Pokedex Controller', function () {
		var pokedexFactory, settingsFactory;
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			pokedexFactory = {
				list: [
					_.clone(pokedexFactoryMock.list.Bulbasaur),
					_.clone(pokedexFactoryMock.list.Charmander),
					_.clone(pokedexFactoryMock.list.Squirtle),
					_.clone(pokedexFactoryMock.list.Pikachu),
				],
			};
			settingsFactory = { pokedexLimit: 18, pokedexFilterType: 'allWords' };
			$provide.value('po_ke_type.pokedex.factory', pokedexFactory);
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
			$provide.value('allWordsFilter', _.identity);
			$provide.value('dexGenFilter', _.identity);
			$provide.value('padNumberFilter', _.identity);
		}));

		var $scope;
		beforeEach(angular.mock.inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			$controller('po_ke_type.pokedex.controller', {
				'$scope': $scope,
			});
			$scope.$digest();
		}));

		describe('controller', function () {
			it('init', function () {
				expect($scope.filteredDex).toEqual(pokedexFactory.list);
				expect($scope.settings).toBe(settingsFactory);
			});
		}); // end controller

		describe('template', function () {
			var element;
			beforeEach(angular.mock.inject(function ($compile, $controller, $templateCache) {
				element = $compile($templateCache.get('pokedex/pokedex.html'))($scope);
				$scope.$digest();
			}));

			it('has seach field', function () {
				expect(element).toContainElement('#filter');
			});

			it('initial search limit', function () {
				expect(element.find('#limit18')).toBeChecked();
			});

			it('show pills', function () {
				expect(element.find('[pokemon-pill]')).toHaveLength(4);
				expect(element.find('[pokemon-pill]:nth(0)')).toContainText('Bulbasaur');
				expect(element.find('[pokemon-pill]:nth(1)')).toContainText('Charmander');
				expect(element.find('[pokemon-pill]:nth(2)')).toContainText('Squirtle');
				expect(element.find('[pokemon-pill]:nth(3)')).toContainText('Pikachu');
			});
		}); // end template
	}); // end Pokedex Controller
});