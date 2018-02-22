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
			expect(Object.keys(types)).toEqual(['chart', 'list', 'text']);
		});
	}); // end po_ke_type.types.factory
});