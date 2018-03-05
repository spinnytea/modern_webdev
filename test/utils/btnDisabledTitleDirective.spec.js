define([
	'angular',
	'src/utils/utilsModule',
	'angular-mocks',
], function (angular, utilsModule) {
	return describe('Btn Disabled Title Directive', function () {
		beforeEach(angular.mock.module(utilsModule.name));

		describe('template', function () {
			var $scope;
			beforeEach(angular.mock.inject(function ($rootScope) {
				$scope = $rootScope.$new();
			}));

			it('just a btn', angular.mock.inject(function ($compile) {
				var element = $compile('<div><i class="btn"></i></div>')($scope);
				$scope.$digest();
				expect(element).toContainElement('i.btn');
				expect(element).not.toContainElement('span');
			}));

			it('btn with title', angular.mock.inject(function ($compile) {
				var element = $compile('<div><i class="btn" title="banana"></i></div>')($scope);
				$scope.$digest();
				expect(element).toContainElement('i.btn');
				expect(element).not.toContainElement('span');
			}));

			it('btn with ngDisabled', angular.mock.inject(function ($compile) {
				$scope.isDisabled = false;
				var element = $compile('<div><i class="btn" title="banana" ng-disabled="isDisabled"></i></div>')($scope);
				$scope.$digest();
				expect(element).toContainElement('span');
				expect(element).toContainElement('span > i.btn');
				expect(element.find('span')).toHaveAttr('title', 'banana');
				expect(element.find('span > i.btn')).toHaveAttr('title', 'banana');
			}));
		}); // end template
	}); // end Btn Disabled Title Directive
});