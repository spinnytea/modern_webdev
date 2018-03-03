define([
	'angular',
	'src/pokedex/pokedexModule',
	'test/utils/bindKeys.mock',
	'angular-mocks',
], function (angular, pokedexModule, bindKeys) {
	return describe('Team Controller', function () {
		var MON_1 = { name: 'Mon 1' };
		var MON_2 = 'Mon 2';
		var pokedexFactory, teamFactory, settingsFactory;
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			pokedexFactory = { list: ['asdf'] };
			teamFactory = [MON_1];
			settingsFactory = {};
			$provide.value('bindKeys', bindKeys);
			$provide.value('po_ke_type.pokedex.factory', pokedexFactory);
			$provide.value('po_ke_type.pokedex.team.factory', teamFactory);
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
		}));

		describe('controller', function () {
			var $scope;
			beforeEach(angular.mock.inject(['$controller', function ($controller) {
				$scope = {};
				$controller('po_ke_type.pokedex.team.controller', {
					'$scope': $scope,
				});
			}]));

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

		it('template'); // end template
	}); // end Team Controller
});