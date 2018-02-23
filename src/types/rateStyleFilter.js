define(['lodash'], function (_) {
	return [RateStyleFilter];

	function RateStyleFilter() {
		return function rateStyle(input, inverse) {
			if(!_.isNumber(input)) return '';

			if(inverse === true || inverse === 'inv' || inverse === 'inverse') {
				if(input !== 0) input = 1/input;
			}

			return 'rate-' + input*100;
		};
	}
});