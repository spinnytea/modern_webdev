define([
	'angular',
	'lodash',
	'src/pokedex/pokedexModule',
	'test/pokedex/pokedexFactory.mock',
	'angular-mocks',
], function (angular, _, pokedexModule, podekexFactoryMock) {
	return describe('Pokemon Pill Directive', function () {
		var settingsFactory;
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			settingsFactory = { colorfulCards: true };
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
			$provide.value('padNumberFilter', _.identity);
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

		describe('template', function () {
			var element;
			beforeEach(angular.mock.inject(['$compile', '$rootScope', function ($compile, $rootScope) {
				$rootScope.mon = podekexFactoryMock.list.Pumpkaboo;
				element = $compile('<i pokemon-pill="mon"></i>')($rootScope);
				$rootScope.$digest();
			}]));

			it('classes', function () {
				expect(element).toHaveClass('colorful');
				expect(element).toHaveClass('ghost-grass');
			});

			it('number', function () {
				expect(element.find('span.label')).toHaveText('710');
			});

			it('name', function () {
				expect(element.find('> a')).toHaveText('Pumpkaboo');
			});

			it('specialname', function () {
				expect(element.find('> small')).toHaveText('(Small Size)');
			});

			it('types', function () {
				expect(element).toContainElement('.type-label.type-ghost:contains("ghost")');
				expect(element).toContainElement('.type-label.type-grass:contains("grass")');
			});
		}); // end template
	}); // end Pokemon Pill Directive
});