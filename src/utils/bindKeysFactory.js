define(['lodash'], function (_) {
	return ['hotkeys', BindKeysFactory];

	function BindKeysFactory(hotkeys) {
		// XXX allow fn to be a string and use $scope[fn]
		return function bindKeys($scope, keys) {
			var bound = hotkeys.bindTo($scope);
			_.forEach(keys, function (fn, key) {
				bound.add({
					combo: key,
					allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
					callback: fn,
				});
			});
		};
	}
});