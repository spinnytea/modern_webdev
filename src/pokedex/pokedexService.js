define(['configPlugins', 'json!data/pokedex.json'], function (plugins, pokedex) {
	return [ PokedexService ];

	function PokedexService() {
		var pokedexService = {};

		pokedexService.pokedex = pokedex;

		return pokedexService;
	}
});