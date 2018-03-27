define([
	'angular',
	'notDevMode',
	'./headController',
	'./homeController',
	'./homeToursSetup',
	'./pageHeaderDirective',
	'./settingsController',
	'./settingsFactory',
	'./siteIOFactory',
], function (
	angular,
	notDevMode,
	headController,
	homeController,
	homeToursSetup,
	pageHeaderDirective,
	settingsController,
	settingsFactory,
	siteIOFactory
) {
	var siteModule = angular.module('po_ke_type.site', [
		pageHeaderDirective.name,
	]);

	siteModule.controller('po_ke_type.site.head.controller', headController);
	siteModule.controller('po_ke_type.site.home.controller', homeController);
	siteModule.controller('po_ke_type.site.settings.controller', settingsController);
	siteModule.factory('po_ke_type.site.settings.factory', settingsFactory);
	siteModule.factory('po_ke_type.site.siteIO.factory', siteIOFactory);

	// REVIEW notDevMode
	// - module.run is really clean for production
	// - but it makes things awful for testing
	// - all of the dependencies of all of the tours need to be mocked before we can use this module
	// - is there a better way that we can define the tours?
	// - should the tours be specified in the controller?
	//   - that seems weird, the tour only starts on the controller, it's not beholden to the controller
	//   - it sort of makes sense for a tour that exists on one single page
	// - should each tour be it's own directive?
	//   - that feels too disparate, or am i just being stilly
	//   - the tour could span multiple pages and the life of the directive
	//   - or is it more like 'this directive starts this tour'
	// - it's nice having a global register
	//   - state needs to be maintained across pages
	//   - its a single point of reference we can use for cataloging, enforcing style, standard features, etc
	if(notDevMode) siteModule.run(homeToursSetup);

	siteModule.constant('po_ke_type.site.settings.defaults', Object.freeze({
		colorfulCards: false,
		dexGen: 6,
		pokedexFilter: '',
		pokedexFilterType: 'allWords',
		pokedexLimit: 18,
		pokedexOrderBy: 'number',
		preferredTypeChart: 'matrix',
		showTourStart: true,
		theme: 'spacelab',
	}));

	return siteModule;
});