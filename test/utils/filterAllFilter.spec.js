define([
	'angular',
	'src/utils/utilsModule',
], function (angular, utilsModule) {
	return describe('Filter All Filter', function () {
		var filterAll;
		var array = [
			'one',
			'one two',
			'one three',
			'two',
			'two one',
			'two three',
			'three',
			'three one',
			'three two',
		];
		beforeEach(angular.mock.module(utilsModule.name));
		beforeEach(angular.mock.inject(['$filter', function ($filter) {
			filterAll = $filter('filterAll');
		}]));

		it('invalid args', function () {
			expect(filterAll(array, {})).toEqual(array);
			expect(filterAll(array, [])).toEqual(array);
			expect(filterAll(array, NaN)).toEqual(array);
		});

		it('empty string', function () {
			expect(filterAll(array, '')).toEqual(array);
			expect(filterAll(array, ' ')).toEqual(array);
		});

		it('one string', function () {
			expect(filterAll(array, 'one')).toEqual([
				'one',
				'one two',
				'one three',
				'two one',
				'three one',
			]);
		});

		it('two string', function () {
			expect(filterAll(array, 'one three')).toEqual([
				'one three',
				'three one',
			]);
		});
	}); // end Filter All Filter
});