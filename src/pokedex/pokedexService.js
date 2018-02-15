define(['configPlugins', 'json!data/pokedex.json', 'json!data/types.json'], function (plugins, pokedex, types) {
	return [ PokedexService ];

	function PokedexService() {
		var pokedexService = {};

		pokedexService.pokedex = pokedex;
		pokedexService.types = types;

		return pokedexService;
	}
});