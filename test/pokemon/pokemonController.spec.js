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
			pokedexFactory = {
				list: [],
				calculateMaxDamageRate: jasmine.createSpy('calculateMaxDamageRate').and.returnValue(1),
			};
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
				pokedexFactory.list.push({ name: 'Is a Mon' });
				$routeParams.name = 'Not a Mon';
				initController();
				expect($scope.mon).toBe(undefined);
				expect(Object.keys($scope)).toEqual(['mon']);
			});

			it('valid mon', function () {
				var MON = { name: 'Mon' };
				pokedexFactory.list.push(MON);
				$routeParams.name = MON.name;
				initController();
				expect($scope.mon).toBe(MON);
				expect(Object.keys($scope)).toEqual(['mon', 'attacking', 'defending']);
			});

			describe('attacking and defending', function () {
				var MON = { name: 'Mon' };
				var TEAM_1 = { name: 'Team 1' };
				var TEAM_2 = { name: 'Team 2' };
				beforeEach(function () {
					pokedexFactory.list.push(MON);
					$routeParams.name = MON.name;
					teamFactory.push(TEAM_1);
					teamFactory.push(TEAM_2);
					initController();
					expect(Object.keys($scope)).toContain('attacking');
					expect(Object.keys($scope)).toContain('defending');
				});

				it('attacking', function () {
					expect(pokedexFactory.calculateMaxDamageRate).toHaveBeenCalledWith(MON, TEAM_1);
					expect(pokedexFactory.calculateMaxDamageRate).toHaveBeenCalledWith(MON, TEAM_2);
					expect($scope.attacking).not.toContain(MON);
					expect($scope.attacking).not.toContain(TEAM_1);
					expect($scope.attacking).not.toContain(TEAM_2);
					expect($scope.attacking).toEqual([{
						rate: 1,
						name: 'Team 1',
					}, {
						rate: 1,
						name: 'Team 2',
					}]);
				});

				it('defending', function () {
					expect(pokedexFactory.calculateMaxDamageRate).toHaveBeenCalledWith(TEAM_1, MON);
					expect(pokedexFactory.calculateMaxDamageRate).toHaveBeenCalledWith(TEAM_2, MON);
					expect($scope.defending).not.toContain(MON);
					expect($scope.defending).not.toContain(TEAM_1);
					expect($scope.defending).not.toContain(TEAM_2);
					expect($scope.defending).toEqual([{
						rate: 1,
						name: 'Team 1',
					}, {
						rate: 1,
						name: 'Team 2',
					}]);
				});
			}); // end attacking and defending
		}); // end controller

		it('template'); // end template
	}); // end Pokemon Controller
});