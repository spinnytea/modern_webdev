define([
	'angular',
	'src/types/typesModule',
	'angular-mocks',
], function (angular, typesModule) {
	return describe('Square Directive', function () {
		beforeEach(angular.mock.module(typesModule.name));

		describe('controller', function () {
			var $scope = { type: 'ground' };
			beforeEach(angular.mock.inject(['$controller', function ($controller) {
				$controller('po_ke_type.types.square.controller', {
					'$scope': $scope,
				});
			}]));

			it('dmgTo', function () {
				expect($scope.dmgTo200).toEqual(['fire', 'electric', 'poison', 'rock', 'steel']);
				expect($scope.dmgTo50).toEqual(['grass', 'bug']);
				expect($scope.dmgTo0).toEqual(['flying']);
			});

			it('dmgFrom', function () {
				expect($scope.dmgFrom200).toEqual(['water', 'grass', 'ice']);
				expect($scope.dmgFrom50).toEqual(['poison', 'rock']);
				expect($scope.dmgFrom0).toEqual(['electric']);
			});
		}); // end controller

		it('template'); // end template
	}); // end Square Directive
});