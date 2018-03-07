define(['lodash'], function (_) {
	return [PadNumberFilter];

	function PadNumberFilter() {
		return function padNumber(input, length) {
			if(!(_.isNumber(input) || _.isString(input))) return input;
			if(!(_.isNumber(length) || _.isString(length))) return input;
			if(isNaN(+input) || isNaN(+length)) return input;
			input = +input;
			length = +length;

			input = ''+input;
			while(input.length < length)
				input = '0'+input;

			return input;
		};
	}
});