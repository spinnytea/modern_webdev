define(['json!data/types.json'], function (typeChart) {
	return [
		TypesFactory,
	];

	function TypesFactory() {
		var types = {};

		types.list = Object.keys(typeChart);

		// raw weakness and resistance
		// types.chart[attacker][defender] = multiplier
		types.chart = typeChart;

		return types;
	}
});