define([
	'angular',
	'src/types/typesModule',
	'angular-mocks',
], function (angular, typesModule) {
	return describe('Square Directive', function () {
		beforeEach(angular.mock.module(typesModule.name));

		it('controller');

		it('template');
	}); // end Square Directive
});