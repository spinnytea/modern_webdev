define([
	'angular',
	'src/utils/utilsModule',
	'angular-mocks',
], function (angular, utilsModule) {
	return describe.only('Tours Factory', function () {
		var tours;
		beforeEach(angular.mock.module(utilsModule.name));
		beforeEach(angular.mock.inject(['po_ke_type.utils.tours.factory', function (_tours_) {
			tours = _tours_;
		}]));

		it('init', function () {
			// NOTE if this list changes, stub a test for the new one
			// - you don't need to implement the test immediately, but at least stub it out
			expect(Object.keys(tours)).toEqual(['register', 'start']);
		});

		describe('register', function () {
			// a few valid examples
			it('valid'); // end valid

			it('errors'); // end errors
		}); // end register

		describe('start', function () {
			it('not a tour');

			it('not started');

			it('not ended');
		}); // end start
	}); // end Tours Factory
});