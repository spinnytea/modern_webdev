define([
	'angular',
	'src/pokedex/pokedexModule',
	'angular-mocks',
], function (angular, pokedexModule) {
	return describe('Pokemon Pill Directive', function () {
		var settingsFactory;
		beforeEach(function () {
			settingsFactory = { colorfulCards: true };
			var module = angular.module('pokemonPillDirective.spec.js', ['html2js', pokedexModule.name]);
			module.value('po_ke_type.site.settings.factory', settingsFactory);
			module.filter('padNumber', function () { return function (i) { return i; }; });
			angular.mock.module('pokemonPillDirective.spec.js');
		});

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
				$rootScope.thingy = {
					number: 'A',
					name: 'Thing',
					specialname: 'Thinger',
					typeStyle: 'test1-test2',
					types: ['test1', 'test2'],
				};
				element = $compile('<i pokemon-pill="thingy"></i>')($rootScope);
				$rootScope.$digest();
			}]));

			it('classes', function () {
				expect(element).toHaveClass('colorful');
				expect(element).toHaveClass('test1-test2');
			});

			it('number', function () {
				expect(element.find('span.label')).toHaveText('A');
			});

			it('name', function () {
				expect(element.find('> a')).toHaveText('Thing');
			});

			it('specialname', function () {
				expect(element.find('> small')).toHaveText('(Thinger)');
			});

			it('types', function () {
				expect(element).toContainElement('.type-label.type-test1:contains("test1")');
				expect(element).toContainElement('.type-label.type-test2:contains("test2")');
			});
		}); // end template
	}); // end Pokemon Pill Directive
});