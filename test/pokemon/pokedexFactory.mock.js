define(['test/testingUtils'], function (testingUtils) {
	var pokedexFactoryMock = {};

	pokedexFactoryMock.list = [
		'{"iconClass":"n1","number":1,"name":"Bulbasaur","specialname":"","types":["grass","poison"],"typeStyle":"grass-poison","linkLocal":"#/pokedex/Bulbasaur"}',
		'{"iconClass":"n4","number":4,"name":"Charmander","specialname":"","types":["fire"],"typeStyle":"fire","linkLocal":"#/pokedex/Charmander"}',
		'{"iconClass":"n7","number":7,"name":"Squirtle","specialname":"","types":["water"],"typeStyle":"water","linkLocal":"#/pokedex/Squirtle"}',
		'{"iconClass":"n25","number":25,"name":"Pikachu","specialname":"","types":["electric"],"typeStyle":"electric","linkLocal":"#/pokedex/Pikachu","$$hashKey":"object:123"}',
	].map(JSON.parse);

	// make them accessable
	pokedexFactoryMock.list.forEach(function (mon) {
		pokedexFactoryMock.list[mon.name] = mon;
	});

	return testingUtils.deepFreeze(pokedexFactoryMock);
});