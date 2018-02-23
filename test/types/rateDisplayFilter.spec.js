define([
	'angular',
	'src/types/typesModule',
	'angular-mocks',
], function (angular, typesModule) {
	return describe('Rate Display Filter', function () {
		var rateDisplay;
		beforeEach(angular.mock.module(typesModule.name));
		beforeEach(angular.mock.inject(['$filter', function ($filter) {
			rateDisplay = $filter('rateDisplay');
		}]));

		it('NaN', function () {
			expect(rateDisplay()).toBe('');
			expect(rateDisplay(NaN)).toBe('');
			expect(rateDisplay([])).toBe('');
			expect(rateDisplay({})).toBe('');
			expect(rateDisplay('')).toBe('');
			expect(rateDisplay(/,/)).toBe('');
		});

		it('expected', function () {
			expect(rateDisplay(0)).toBe(0);
			expect(rateDisplay(0.25)).toBe('¼');
			expect(rateDisplay(0.5)).toBe('½');
			expect(rateDisplay(1)).toBe('');
			expect(rateDisplay(2)).toBe(2);
			expect(rateDisplay(4)).toBe(4);
		});

		it('unexpected'); // any number other than what's in expected
	}); // end Rate Display Filter
});