define([
	'angular',
	'src/types/typesModule',
	'angular-mocks',
], function (angular, typesModule) {
	return describe('Rate Style Filter', function () {
		var rateStyle;
		beforeEach(angular.mock.module(typesModule.name));
		beforeEach(angular.mock.inject(['$filter', function ($filter) {
			rateStyle = $filter('rateStyle');
		}]));

		it('NaN', function () {
			expect(rateStyle()).toBe('');
			expect(rateStyle(NaN)).toBe('');
			expect(rateStyle([])).toBe('');
			expect(rateStyle({})).toBe('');
			expect(rateStyle('')).toBe('');
			expect(rateStyle(/,/)).toBe('');
		});

		it('expected', function () {
			expect(rateStyle(0)).toBe('rate-0');
			expect(rateStyle(0.25)).toBe('rate-25');
			expect(rateStyle(0.5)).toBe('rate-50');
			expect(rateStyle(1)).toBe('rate-100');
			expect(rateStyle(2)).toBe('rate-200');
			expect(rateStyle(4)).toBe('rate-400');
		});

		it('inverse', function () {
			expect(rateStyle(0, true)).toBe('rate-0');
			expect(rateStyle(0.25, true)).toBe('rate-400');
			expect(rateStyle(0.5, true)).toBe('rate-200');
			expect(rateStyle(1, true)).toBe('rate-100');
			expect(rateStyle(2, true)).toBe('rate-50');
			expect(rateStyle(4, true)).toBe('rate-25');
		});

		it('unexpected'); // any number other than what's in expected
	}); // end Rate Style Filter
});