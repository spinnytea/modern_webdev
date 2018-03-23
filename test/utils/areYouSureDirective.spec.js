define([
	'angular',
	'lodash',
	'src/utils/utilsModule',
	'angular-mocks',
], function (angular, _, utilsModule) {
	return describe('Are You Sure Directive', function () {
		var $timeout;
		beforeEach(angular.mock.module(utilsModule.name));
		beforeEach(angular.mock.inject(function (_$timeout_) {
			$timeout = _$timeout_;
		}));

		describe('controller', function () {
			var $scope;
			beforeEach(angular.mock.inject(function ($controller, $rootScope) {
				$scope = $rootScope.$new();
				$controller('po_ke_type.utils.areYouSure.directive.controller', {
					'$scope': $scope,
				});
			}));

			it('init', function () {
				var keys = _.chain($scope)
					.keys()
					.filter(function (k) { return !_.startsWith(k, '$'); })
					.sort()
					.value();

				// if this list changes, stub a test for the new one
				// - you don't need to implement the test immediately, but at least stub it out
				expect(keys).toEqual([
					'reset',
					'step',
					'theCheck',
				]);
				expect($scope.step).toBe(1);
			});

			it('reset', function () {
				$scope.step = 1;
				$scope.reset();
				expect($scope.step).toBe(1);

				$scope.step = 2;
				$scope.reset();
				expect($scope.step).toBe(1);

				$scope.step = 3;
				$scope.reset();
				expect($scope.step).toBe(3);

				$scope.step = 4;
				$scope.reset();
				expect($scope.step).toBe(1);

				$scope.step = 5;
				$scope.reset();
				expect($scope.step).toBe(1);
			});

			it('through done', function () {
				expect($scope.step).toBe(1);
				$scope.callback = angular.noop;

				$scope.theCheck();

				expect($scope.step).toBe(2);
				$scope.$digest();
				expect($scope.step).toBe(2);

				$scope.theCheck();

				expect($scope.step).toBe(3);
				$scope.theCheck();
				expect($scope.step).toBe(3);
				$scope.$digest();
				expect($scope.step).toBe(3);

				$timeout.flush();
				$scope.$digest();

				expect($scope.step).toBe(4);
				$scope.theCheck();
				expect($scope.step).toBe(4);
			});

			it('through error', function () {
				expect($scope.step).toBe(1);
				$scope.callback = function () { throw new Error(); };

				$scope.theCheck();

				expect($scope.step).toBe(2);

				$scope.theCheck();

				expect($scope.step).toBe(3);

				$timeout.flush();
				$scope.$digest();

				expect($scope.step).toBe(5);
				$scope.theCheck();
				expect($scope.step).toBe(5);
			});
		}); // end controller

		describe('template', function () {
			var $scope, element, $q;
			beforeEach(angular.mock.inject(function ($compile, $rootScope, _$q_) {
				$q = _$q_;
				$scope = $rootScope.$new();
				$scope.doTheThing = jasmine.createSpy('doTheThing');
				element = $compile('<button are-you-sure="doTheThing()">Do The Thing</button>')($scope);
				$scope.$digest();
			}));

			it('init', function () {
				expect(element).toBeMatchedBy('button[ng-click]');
				expect(element.text().trim()).toBe('Do The Thing');
			});

			it('reset', function () {
				expect(element.text().trim()).toBe('Do The Thing');

				element.trigger('click');
				$scope.$digest();

				expect(element.text().trim()).toBe('Are you sure');

				element.trigger('mouseleave');
				$scope.$digest();

				expect(element.text().trim()).toBe('Do The Thing');
			});

			it('through done, simple', function () {
				expect(element.text().trim()).toBe('Do The Thing');
				expect($scope.doTheThing).not.toHaveBeenCalled();

				element.trigger('click');
				$scope.$digest();

				expect(element.text().trim()).toBe('Are you sure');
				expect($scope.doTheThing).not.toHaveBeenCalled();

				element.trigger('click');
				$scope.$digest();

				expect(element.text().trim()).toBe('Working');
				expect($scope.doTheThing).not.toHaveBeenCalled();

				$timeout.flush();
				$scope.$digest();

				expect(element.text().trim()).toBe('Done');
				expect($scope.doTheThing).toHaveBeenCalled();
			});

			it('through done, promise', function () {
				expect(element.text().trim()).toBe('Do The Thing');
				expect($scope.doTheThing).not.toHaveBeenCalled();
				var deferred = $q.defer();
				$scope.doTheThing.and.returnValue(deferred.promise);

				element.trigger('click');
				$scope.$digest();

				expect(element.text().trim()).toBe('Are you sure');
				expect($scope.doTheThing).not.toHaveBeenCalled();

				element.trigger('click');
				$scope.$digest();

				expect(element.text().trim()).toBe('Working');
				expect($scope.doTheThing).not.toHaveBeenCalled();

				$timeout.flush();
				$scope.$digest();

				expect(element.text().trim()).toBe('Working');
				expect($scope.doTheThing).toHaveBeenCalled();

				deferred.resolve();
				$scope.$digest();

				expect(element.text().trim()).toBe('Done');
				expect($scope.doTheThing).toHaveBeenCalled();
			});

			it('through error, reject', function () {
				expect(element.text().trim()).toBe('Do The Thing');
				expect($scope.doTheThing).not.toHaveBeenCalled();
				$scope.doTheThing.and.callFake($q.reject);

				element.trigger('click');
				$scope.$digest();

				expect(element.text().trim()).toBe('Are you sure');
				expect($scope.doTheThing).not.toHaveBeenCalled();

				element.trigger('click');
				$scope.$digest();

				expect(element.text().trim()).toBe('Working');
				expect($scope.doTheThing).not.toHaveBeenCalled();

				$timeout.flush();
				$scope.$digest();

				expect(element.text().trim()).toBe('Error');
				expect($scope.doTheThing).toHaveBeenCalled();
			});

			it('through error, throw', function () {
				expect(element.text().trim()).toBe('Do The Thing');
				expect($scope.doTheThing).not.toHaveBeenCalled();
				$scope.doTheThing.and.callFake(function () { throw new Error(); });

				element.trigger('click');
				$scope.$digest();

				expect(element.text().trim()).toBe('Are you sure');
				expect($scope.doTheThing).not.toHaveBeenCalled();

				element.trigger('click');
				$scope.$digest();

				expect(element.text().trim()).toBe('Working');
				expect($scope.doTheThing).not.toHaveBeenCalled();

				$timeout.flush();
				$scope.$digest();

				expect(element.text().trim()).toBe('Error');
				expect($scope.doTheThing).toHaveBeenCalled();
			});
		}); // end template
	}); // end Are You Sure Directive
});