define([
	'angular',
	'src/utils/utilsModule',
], function (angular, utilsModule) {
	return describe('Start Tour Directive', function () {
		var toursFactory, settingsFactory;
		beforeEach(angular.mock.module(utilsModule.name, function ($provide) {
			toursFactory = jasmine.createSpyObj('toursFactory', ['start', 'exists']);
			toursFactory.exists.and.returnValue(true);
			settingsFactory = { showTourStart: true };
			$provide.value('po_ke_type.utils.tours.factory', toursFactory);
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
		}));

		describe('controller', function () {
			var $scope;
			beforeEach(angular.mock.inject(function ($controller) {
				$scope = { name: 'someTour' };
				$controller('po_ke_type.utils.tourStart.directive.controller', {
					'$scope': $scope,
				});
			}));

			it('init', function () {
				// if this list changes, stub a test for the new one
				// - you don't need to implement the test immediately, but at least stub it out
				expect(Object.keys($scope).sort()).toEqual([
					'name',
					'show',
					'start',
				]);
			});

			it('show');

			it('start', function () {
				expect(toursFactory.start).not.toHaveBeenCalled();

				$scope.start();

				expect(toursFactory.start).toHaveBeenCalledTimes(1);
				expect(toursFactory.start).toHaveBeenCalledWith('someTour');
			});
		}); // end controller

		describe('template', function () {
			var $scope, element;
			beforeEach(angular.mock.inject(function ($compile, $rootScope) {
				$scope = $rootScope.$new();
				$scope.name = 'someTour';
				element = $compile('<i tour-start="someTour"></i>')($scope);
				$scope.$digest();
			}));

			it('init', function () {
				expect(element).toBeMatchedBy('i.fa-question-circle');
				expect(element).toBeMatchedBy('[ng-click]');
			});

			it('click', function () {
				expect(toursFactory.start).not.toHaveBeenCalled();

				element.trigger('click');

				expect(toursFactory.start).toHaveBeenCalledTimes(1);
				expect(toursFactory.start).toHaveBeenCalledWith('someTour');
			});
		}); // end template
	}); // end Start Tour Directive
});