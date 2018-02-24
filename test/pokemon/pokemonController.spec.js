define([
	'angular',
	'src/pokedex/pokedexModule',
	'angular-mocks',
], function (angular, pokedexModule) {
	return describe('Pokemon Controller', function () {
		var pokedexFactory;
		var teamFactory;
		beforeEach(function () {
			// HACK why does this init ned to be in it's own function?
			// - why can't it be in the angular.mock.module block?
			// - shouldn't the beforeEach's be executed in order?
			pokedexFactory = { list: [] };
			teamFactory = [];
		});
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			$provide.value('po_ke_type.pokedex.factory', pokedexFactory);
			$provide.value('po_ke_type.pokedex.team.factory', teamFactory);
		}));

		describe('controller', function () {
			var $scope, $routeParams;
			beforeEach(function () {
				$scope = {};
				$routeParams = {};
			});
			function initController() {
				angular.mock.inject(['$controller', function ($controller) {
					$controller('po_ke_type.pokedex.pokemon.controller', {
						'$scope': $scope,
						'$routeParams': $routeParams,
					});
				}]);
			}

			describe('awkward params', function () {
				beforeEach(function () {
					pokedexFactory.list.push({ name: 'Mon', specialname: 'Special Mon' });
				});
				afterEach(function () {
					initController();
					expect($scope.mon).toBe(undefined);
					expect(Object.keys($scope)).toEqual(['mon']);
				});

				it('empty route params', function () {
					$routeParams = {};
				});

				it('route without name', function () {
					$routeParams.specialname = 'Special Mon';
				});

				// actually, this is normal
				it('route without specialname', function () {
					$routeParams.name = 'Mon';
				});
			}); // end awkward params

			describe('awkward mon', function () {
				beforeEach(function () {
					$routeParams.name = 'Mon';
					$routeParams.specialname = 'Special Mon';
				});
				afterEach(function () {
					initController();
					expect($scope.mon).toBe(undefined);
					expect(Object.keys($scope)).toEqual(['mon']);
				});

				// shouldn't happen, we have data
				it('empty list', function () {
					pokedexFactory.list.splice(0);
				});

				it('no name or specialname', function () {
					pokedexFactory.list.push({});
				});

				it('mon without name', function () {
					pokedexFactory.list.push({ specialname: 'Special Mon' });
				});

				// should be an empty string
				it('mon without specialname', function () {
					pokedexFactory.list.push({ name: 'Mon' });
				});
			}); // end awkward params

			it('invalid mon', function () {
				$routeParams.name = 'Not a Mon';
				initController();
				expect($scope.mon).toBe(undefined);
				expect(Object.keys($scope)).toEqual(['mon']);
			});

			it('attacking');

			it('defending');
		}); // end controller

		it('template'); // end template
	}); // end Pokemon Controller
});