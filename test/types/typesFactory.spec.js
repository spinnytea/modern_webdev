define([
	'src/types/types',
	'angular',
	'angular-mocks',
], function (
	typesModule,
	angular
) {
	return describe('po_ke_type.types.factory', function () {
		var types;
		beforeEach(angular.mock.module(typesModule.name));
		beforeEach(angular.mock.inject(['po_ke_type.types.factory', function (_types_) {
			types = _types_;
		}]));

		it('init', function () {
			// NOTE if this list changes, stub a test for the new one
			// - you don't need to implement the test, but at least stub it out
			expect(Object.keys(types)).toEqual(['chart', 'list', 'text']);
		});

		it('chart');

		it('list');

		it('text');
	}); // end po_ke_type.types.factory
});