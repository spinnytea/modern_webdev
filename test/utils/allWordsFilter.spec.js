define([
	'angular',
	'src/utils/utilsModule',
], function (angular, utilsModule) {
	return describe('Filter All Filter', function () {
		var allWords;
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
			allWords = $filter('allWords');
		}]));

		it('invalid args', function () {
			expect(allWords(array, {})).toEqual(array);
			expect(allWords(array, [])).toEqual(array);
			expect(allWords(array, NaN)).toEqual(array);
		});

		it('empty string', function () {
			expect(allWords(array, '')).toEqual(array);
			expect(allWords(array, ' ')).toEqual(array);
		});

		it('one string', function () {
			expect(allWords(array, 'one')).toEqual([
				'one',
				'one two',
				'one three',
				'two one',
				'three one',
			]);
		});

		it('two string', function () {
			expect(allWords(array, 'one three')).toEqual([
				'one three',
				'three one',
			]);
		});
	}); // end Filter All Filter
});