define(['json!data/pokedex.json'], function (pokedexJson) {
	return [
		'po_ke_type.types.factory',
		PokedexFactory,
	];

	function PokedexFactory(types) {
		var pokedex = {};

		pokedex.list = pokedexJson;

		pokedex.list.forEach(function (mon) {
			mon.typeStyle = mon.types[0];
			if(mon.types[1]) mon.typeStyle += '-' + mon.types[1];
			mon.linkLocal = '#/pokedex/' + mon.name + (mon.specialname?('/'+encodeURI(mon.specialname)):'');
		});

		pokedex.calculateMaxDamageRate = function calculateMaxDamageRate(atk, def) {
			return atk.types.reduce(function (max, atk_type) {
				var rate = def.types.reduce(function (r, def_type) {
					return r * types.chart[atk_type][def_type];
				}, 1);
				return Math.max(max, rate);
			}, 0);
		};

		return pokedex;
	}
});