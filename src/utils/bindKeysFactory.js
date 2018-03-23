define(['lodash'], function (_) {
	return ['hotkeys', BindKeysFactory];

	function BindKeysFactory(hotkeys) {
		return function bindKeys($scope, keys) {
			var bound = hotkeys.bindTo($scope);
			_.forEach(keys, function (fn, key) {
				var cb;
				if(_.isFunction(fn)){
					cb = fn;
				}
				else if(_.isString(fn)) {
					// call the function by name
					// wrapping it allows the definition to be changed at runtime
					cb = function () {
						$scope[fn]();
					};
				}
				else {
					// since there are options, we should be clear about what they are
					throw new Error('invalid bound function');
				}

				bound.add({
					combo: key,
					allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
					callback: cb,
				});
			});
		};
	}
});