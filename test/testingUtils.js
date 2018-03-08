define([], function () {
	var testingUtils = {};

	testingUtils.deepFreeze = function deepFreeze(o) {
		Object.freeze(o);

		Object.getOwnPropertyNames(o).forEach(function (prop) {
			if (o.hasOwnProperty(prop)
				&& o[prop] !== null
				&& (typeof o[prop] === 'object' || typeof o[prop] === 'function')
				&& !Object.isFrozen(o[prop])) {
				deepFreeze(o[prop]);
			}
		});

		return o;
	};

	return testingUtils;
});