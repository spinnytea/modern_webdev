define([
	'angular',
	'lodash',
	'src/pokedex/pokedexModule',
	'test/pokedex/pokedexFactory.mock',
	'test/utils/bindKeys.mock',
	'angular-mocks',
], function (angular, _, pokedexModule, pokedexFactoryMock, bindKeys) {
	return describe('Team Controller', function () {
		var pokedexFactory, teamFactory, settingsFactory;
		beforeEach(function () {
			pokedexFactory = { list: [] };
			teamFactory = [];
			settingsFactory = {};
		});
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			$provide.value('bindKeys', bindKeys);
			$provide.value('po_ke_type.pokedex.factory', pokedexFactory);
			$provide.value('po_ke_type.pokedex.team.factory', teamFactory);
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
			$provide.value('padNumberFilter', _.identity);
		}));

		describe('controller', function () {
			var MON_1 = { name: 'Mon 1' };
			var MON_2 = 'Mon 2';
			beforeEach(function () {
				pokedexFactory.list.push(['asdf']);
				teamFactory.push(MON_1);
			});

			var $scope;
			beforeEach(angular.mock.inject(function ($controller) {
				$scope = {};
				$controller('po_ke_type.pokedex.team.controller', {
					'$scope': $scope,
				});
			}));

			it('init', function () {
				expect($scope.settings).toBe(settingsFactory);
				expect($scope.dex).toBe(pokedexFactory.list);
				expect($scope.team).toBe(teamFactory);
			});

			it('showList', function () {
				expect($scope.showList()).toBe(false);
				$scope.nested.filter = 'asdf';
				expect($scope.showList()).toBe(true);
				$scope.nested.filter = '';
				expect($scope.showList()).toBe(false);
			});

			it('isInTeam', function () {
				expect($scope.isInTeam(MON_1)).toBe(true);
				expect($scope.isInTeam(MON_2)).toBe(false);
				expect(teamFactory).toEqual([MON_1]);
			});

			it('addToTeam', function () {
				expect(teamFactory).toEqual([MON_1]);
				$scope.addToTeam(MON_2);
				expect(teamFactory).toEqual([MON_1, MON_2]);
				$scope.addToTeam(MON_2);
				expect(teamFactory).toEqual([MON_1, MON_2]);
			});

			it('addToTeam', function () {
				teamFactory.push(MON_2);
				expect(teamFactory).toEqual([MON_1, MON_2]);
				$scope.removeFromTeam(MON_2);
				expect(teamFactory).toEqual([MON_1]);
				$scope.removeFromTeam(MON_2);
				expect(teamFactory).toEqual([MON_1]);
			});

			describe('getFilteredList', function () {
				beforeEach(function () {
					$scope.nested.filter = 'asdf';
					$scope.nested.filteredDex = [MON_1, MON_2];
					expect(teamFactory).toEqual([MON_1]);
				});

				it('addAll', function () {
					$scope.$bindKeysFn.addAll();
					expect(teamFactory).toEqual([MON_1, MON_2]);
				});

				it('removeAll', function () {
					$scope.$bindKeysFn.removeAll();
					expect(teamFactory).toEqual([]);
				});

				it('exact', function () {
					$scope.nested.filter = MON_1.name;
					$scope.$bindKeysFn.addAll();
					expect(teamFactory).toEqual([MON_1]);
				});

				it('noFilter', function () {
					$scope.nested.filter = '';
					$scope.$bindKeysFn.removeAll();
					expect(teamFactory).toEqual([MON_1]);
				});
			}); // end getFilteredList
		}); // end controller

		// QUESTION should we be testing the template on the larger pages?
		describe('template', function () {
			var $scope, element;
			beforeEach(angular.mock.inject(function ($compile, $controller, $templateCache, $rootScope) {
				teamFactory.push(_.clone(pokedexFactoryMock.list.Bulbasaur));
				$scope = $rootScope.$new();
				$controller('po_ke_type.pokedex.team.controller', {
					'$scope': $scope,
				});
				element = $compile($templateCache.get('pokedex/team.html'))($scope);
				$scope.$digest();
			}));

			it('init', function () {
				expect($scope.team).toEqual([
					jasmine.objectContaining({ name: 'Bulbasaur' }),
				]);
			});

			it('pokemon-card', function () {
				expect(element.find('[pokemon-card]')).toHaveLength(1);
				expect(element.find('[pokemon-card] header')).toContainText('Bulbasaur');
				expect(element.find('[pokemon-card]')).toContainElement('.pki.n1');
				expect(element.find('[pokemon-card]')).toContainElement('.type-grass');
				expect(element.find('[pokemon-card]')).toContainElement('.type-poison');
			});

			it('filter to add to team', function () {
				expect(element).toContainElement('#filter');
			});
		}); // end template
	}); // end Team Controller
});