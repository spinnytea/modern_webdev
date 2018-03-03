define(['jquery', 'lodash'], function ($, _) {
	var registeredTours = {};

	return [
		'$rootScope', 'Tour',
		ToursFactory,
	];

	function ToursFactory($rootScope, Tour) {
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

			// check for path consistency (all must have path or no)
			var stepsUsePath = config.steps[0].hasOwnProperty('path');
			var allStepsUseOrDontUsePath = _.every(config.steps, function (step) { return step.hasOwnProperty('path') === stepsUsePath; });
			if(!allStepsUseOrDontUsePath) throw new Error('either no steps can use path, or all steps use path, there isn\'t an in between');

			if(stepsUsePath && _.some(config.steps, function (step) { return _.startsWith(step.path, '#') || _.startsWith(step.path, '/#'); }))
				throw new Error('no need to prefix paths with a hash, we will do that');

			// BUG Uncaught TypeError: Cannot read property 'backdrop' of undefined
			// BUG Uncaught TypeError: Cannot read property 'onNext' of undefined
			registeredTours[config.name] = new Tour({
				name: config.name,
				backdrop: false,
				keyboard: true,
				steps: config.steps.map(function (step) {
					if(step.orphan) {
						if(step.element) throw new Error("orphaned steps don't need an element");
						if(step.placement) throw new Error("orphaned steps don't need an element");
					}
					else {
						if(!_.isString(step.element)) throw new Error('each step must have an element');
						if(!_.isString(step.placement)) throw new Error('each step must have placement');
					}
					if(!_.isString(step.content)) throw new Error('each step must have content');
					step.title = config.title;
					if(stepsUsePath) step.path = '/#' + step.path;
					return step;
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
				if(!tour.ended()) tour.end();
				tour.restart();
			}
		};

		// HACK bootstrap-tour blows up on route change because the new element isn't on the page
		$rootScope.$on('$routeChangeSuccess', function () {
			var toursActive = _.some(registeredTours, function (tour) { return !tour.ended(); });
			if(toursActive) $(window).resize();
		});

		return tours;
	}
});