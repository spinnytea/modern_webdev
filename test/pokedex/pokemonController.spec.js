define([
	'angular',
	'lodash',
	'src/pokedex/pokedexModule',
	'test/pokedex/pokedexFactory.mock',
	'angular-mocks',
], function (angular, _, pokedexModule, pokedexFactoryMock) {
	return describe('Pokemon Controller', function () {
		var pokedexFactory, teamFactory, settingsFactory;
		beforeEach(function () {
			// these need to be initialized in their own beforeEach
			// angular.mock.module runs late
			// later on, some describe blocks override the default values
			// these need to be reset before those
			pokedexFactory = {
				list: [],
				calculateMaxDamageRate: jasmine.createSpy('calculateMaxDamageRate').and.returnValue(1),
			};
			teamFactory = [];
			settingsFactory = {};
		});
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			$provide.value('po_ke_type.pokedex.factory', pokedexFactory);
			$provide.value('po_ke_type.pokedex.team.factory', teamFactory);
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
			$provide.value('rateStyleFilter', _.identity);
			$provide.value('rateDisplayFilter', _.identity);
		}));

		describe('controller', function () {
			var $scope, $routeParams;
			beforeEach(function () {
				$scope = {};
				$routeParams = {};
			});
			function initController() {
				angular.mock.inject(function ($controller) {
					$controller('po_ke_type.pokedex.pokemon.controller', {
						'$scope': $scope,
						'$routeParams': $routeParams,
					});
				});
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

		describe('template', function () {
			var $scope, element;
			beforeEach(angular.mock.inject(function ($compile, $controller, $templateCache, $rootScope) {
				pokedexFactory.list.push(pokedexFactoryMock.list.Bulbasaur);
				teamFactory.push(pokedexFactoryMock.list.Charmander);
				teamFactory.push(pokedexFactoryMock.list.Squirtle);
				$scope = $rootScope.$new();
				$controller('po_ke_type.pokedex.pokemon.controller', {
					'$scope': $scope,
					'$routeParams': { name: 'Bulbasaur' },
				});
				// HACK why do we have to wrap the templateCache in a div, but we don't need to for pokedex.html?
				element = $compile('<div>' + $templateCache.get('pokedex/pokemon.html') + '</div>')($scope);
				$scope.$digest();
			}));

			it('init', function () {
				expect($scope.mon).toBe(pokedexFactoryMock.list.Bulbasaur);
				expect($scope.attacking).toEqual([
					jasmine.objectContaining({ name: 'Charmander', rate: 1 }),
					jasmine.objectContaining({ name: 'Squirtle', rate: 1 }),
				]);
				expect($scope.defending).toEqual([
					jasmine.objectContaining({ name: 'Charmander', rate: 1 }),
					jasmine.objectContaining({ name: 'Squirtle', rate: 1 }),
				]);
			});

			it('oops', function () {
				var oops = 'h1:contains("Who\'s that Pokémon?")';

				// setup scope to be valid
				expect(element).not.toContainElement(oops);

				// make sure oops is used if it's not valid
				$scope.mon = undefined;
				$scope.$digest();
				expect(element).toContainElement(oops);
			});

			it('heading', function () {
				expect(element).toContainElement('h1');
			});

			it('type squares', function () {
				expect(element.find('[type-square]')).toHaveLength(2);
				expect(element.find('[type-square]:nth(0)').scope().type).toBe('grass');
				expect(element.find('[type-square]:nth(1)').scope().type).toBe('poison');
			});

			it('defending', function () {
				var section = element.find('section > header:contains(Defending) + div');
				expect(section).toContainElement('[title="Charmander"].pki.n4');
				expect(section).toContainElement('[title="Squirtle"].pki.n7');
			});

			it('attacking', function () {
				var section = element.find('section > header:contains(Attacking) + div');
				expect(section).toContainElement('[title="Charmander"].pki.n4');
				expect(section).toContainElement('[title="Squirtle"].pki.n7');
			});
		}); // end template
	}); // end Pokemon Controller
});