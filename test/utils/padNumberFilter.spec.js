define([
	'angular',
	'src/utils/utilsModule',
	'angular-mocks',
], function (angular, utilsModule) {
	return describe('Pad Number Filter', function () {
		var padNumber;
		beforeEach(angular.mock.module(utilsModule.name));
		beforeEach(angular.mock.inject(['$filter', function ($filter) {
			padNumber = $filter('padNumber');
		}]));

		it('invalid input', function () {
			expect(padNumber(undefined, 10)).toBe(undefined);
			expect(padNumber({}, 3)).toEqual({});
			expect(padNumber(NaN, 3)).toEqual(NaN);
		});

		it('invalid length', function () {
			expect(padNumber(10)).toBe(10);
			expect(padNumber(8, [])).toBe(8);
			expect(padNumber('123', 'banana')).toBe('123');
		});

		it('needs padding', function () {
			expect(padNumber(10, 3)).toBe('010');
			expect(padNumber(8, '4')).toBe('0008');
			expect(padNumber('123', 5)).toBe('00123');
		});

		it('correct size', function () {
			expect(padNumber(10, 2)).toBe('10');
			expect(padNumber(8, '1')).toBe('8');
			expect(padNumber('123', 3)).toBe('123');
		});

		it('already too long', function () {
			expect(padNumber(1000, 2)).toBe('1000');
			expect(padNumber(9999, 1)).toBe('9999');
		});
	}); // end Pad Number Filter
});