define(['lodash'], function (_) {
	return [RateDisplayFilter];

	function RateDisplayFilter() {
		return function rateDisplay(input) {
			if(!_.isNumber(input)) return '';

			switch(input) {
				case 1: return ''; // don't display 1s
				case 0.5: return '½'; // fancy
				case 0.25: return '¼'; // fancy
				default: return input; // expected 0, 2, 4
			}
		};
	}
});