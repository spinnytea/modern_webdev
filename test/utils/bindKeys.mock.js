define(['lodash'], function (_) {
	// requirejs: 'test/utils/bindKeys.mock' -> bindKeys
	// angular: $provide.value('bindKeys', bindKeys);
	return function bindKeysMock($scope, config) {
		if(!_.isObject($scope)) throw new Error('bindKeys must be bound to a scope');
		if(!_.isObject(config)) throw new Error('bindKeys must be called with a config object');
		_.values(config).forEach(function (cb) {
			if(!_.isFunction(cb)) throw new Error('bindKeys config only accepts functions');
			if(!cb.name) throw new Error('bindKeys callbacks should have names');
		});

		// save the config for use in unit tests
		$scope.$bindKeysFn = _.transform(config, function (result, cb) {
			result[cb.name] = cb;
		}, {});
	};
});