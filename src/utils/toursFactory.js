define(['lodash', 'Tour'], function (_, Tour) {
	var registeredTours = {};

	return [ToursFactory];

	function ToursFactory() {
		var tours = {};

		/**
		 *	verify and configure a bootstrap-tour
		 *
		 * TODO what if a tour is already registered under this name?
		 *
		 * @param config.name {String}: the name of the tour
		 * @param config.title {String}: (optional) the title of the tour, will be set for all steps
		 * @param config.steps {Array}: see bootstrap-tour docs for details, checked and tweaked for convenience
		 */
		tours.register = function (config) {
			if(!_.isObject(config)) throw new Error('config must be present');
			if(!_.isString(config.name) || !/^[\w\d-]+$/.test(config.name)) throw new Error('config must be alphanumeric');
			if(!_.isArray(config.steps) || !config.steps.length) throw new Error('tours must have at least one step');

			registeredTours[config.name] = new Tour({
				name: config.name,
				steps: config.steps.map(function (s) {
					if(!_.isString(s.element)) throw new Error('each step must have an element');
					if(!_.isString(s.content)) throw new Error('each step must have content');
					s.title = config.title;
					return s;
				}),
			});
			registeredTours[config.name].init();
		};

		/**
		 * start a tour
		 * bootstrap-tour is a bit quirky, or at least for our needs
		 *
		 * @param name {String}: the name of the registered tour
		 */
		tours.start = function (name) {
			var tour = registeredTours[name];
			if(tour) {
				if(tour.ended()) tour.restart();
				else tour.start(true);
			}
		};

		return tours;
	}
});