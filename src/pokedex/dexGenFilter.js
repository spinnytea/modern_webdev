define(['lodash'], function (_) {
		// (gen 1 is position 1)
		var MAX_NUM = [0, 151, 251, 386, 494, 649, 721];

	return ['localStorageService', DexGenFilter];

	function DexGenFilter(localStorageService) {
		return function dexGen(array) {
			if(!_.isArray(array)) return [];
			var gen = +(localStorageService.get('dexGen') || '6');
			var maxNum = MAX_NUM[gen];
			return array.filter(function (mon) {
				// filter out mega evolutions unless we are Gen VI forward
				if(gen < 6 && _.startsWith(mon.specialname, 'Mega')) return false;
				return mon.number <= maxNum;
			});
		};
	}
});