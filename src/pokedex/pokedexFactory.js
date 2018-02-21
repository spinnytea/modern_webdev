define(['json!data/pokedex.json'], function (pokedexJson) {
	return [
		PokedexFactory,
	];

	function PokedexFactory() {
		var pokedex = {};

		pokedex.list = pokedexJson;

		pokedex.list.forEach(function (mon) {
			mon.typeStyle = mon.types[0];
			if(mon.types[1]) mon.typeStyle += '-' + mon.types[1];
		});

		return pokedex;
	}
});