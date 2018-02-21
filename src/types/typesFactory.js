define(['lodash', 'json!data/types.json'], function (_, typesJson) {
	return [
		TypesFactory,
	];

	function TypesFactory() {
		var types = {};

		// raw weakness and resistance
		// types.chart[attacker][defender] = multiplier
		types.chart = typesJson;

		// just the list of types
		types.list = Object.keys(typesJson);

		// text strings for each type
		types.text = types.list.reduce(function (ret, type) {
			ret[type] = {
				name: _.capitalize(type),
				title: _.toUpper(type.substr(0,3)),
			};
			return ret;
		}, {});

		return types;
	}
});