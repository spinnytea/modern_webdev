define(['lodash'], function (_) {
	return [PadNumberFilter];

	function PadNumberFilter() {
		return function padNumber(input, length) {
			input = +input;
			length = +length;
			if(!_.isNumber(input) || !_.isNumber(length))
				return input;

			input = ''+input;
			while(input.length < length)
				input = '0'+input;

			return input;
		};
	}
});