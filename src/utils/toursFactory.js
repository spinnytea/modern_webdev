define(['jquery', 'lodash'], function ($, _) {
	var registeredTours = {};

	return [
		'$rootScope', '$timeout', 'Tour',
		ToursFactory,
	];

	function ToursFactory($rootScope, $timeout, Tour) {
		var tours = {};

		/**
		 *	verify and configure a bootstrap-tour
		 * BUG when we refresh the page, the tour moves forward two steps (it should stay on the current step)
		 * - to reproduce: be familiar with a tour, start it, refresh the page (again if you like)
		 * - it doesn't just move to the next step, it moves two steps forward
		 *
		 * @param {Object} config - basically the same as the standard Tour config object, but we have some custom rules and helpers
		 * @param {String} config.name - the name of the tour
		 * @param {String} [config.title] - the title of the tour, will be set for all steps
		 * @param {Object[]} config.steps - see bootstrap-tour docs for details, checked and tweaked for convenience
		 */
		tours.register = function (config) {
			if(!_.isObject(config)) throw new Error('config must be present');
			if(!_.isString(config.name)) throw new Error('tours must have a name');
			if(!/^[\w\d-]+$/.test(config.name)) throw new Error('tour names must be alphanumeric');
			if(registeredTours[config.name]) throw new Error('tour names must be unique');
			if(config.title !== undefined && !_.isString(config.title)) throw new Error('tour titles must be a string');
			if(!_.isArray(config.steps)) throw new Error('tours must have steps');
			if(!config.steps.length) throw new Error('tours must have at least one step');

			// check for path consistency (all must have path or no)
			var stepsUsePath = config.steps[0].hasOwnProperty('path');
			var allStepsUseOrDontUsePath = _.every(config.steps, function (step) { return step.hasOwnProperty('path') === stepsUsePath; });
			if(!allStepsUseOrDontUsePath) throw new Error('either no steps can use path, or all steps use path, there isn\'t an in between');

			var tour = new Tour({
				name: config.name,
				backdrop: false,
				keyboard: true,
				steps: config.steps.map(function (step) {
					if(stepsUsePath) {
						if(_.startsWith(step.path, '#')) throw new Error('no need to prefix paths with #, that is automatic');
						if(_.startsWith(step.path, '/#')) throw new Error('no need to prefix paths with /#, that is automatic');
					}
					if(step.orphan) {
						if(step.element) throw new Error("orphaned steps don't need an element");
						if(step.placement) throw new Error("orphaned steps don't need a placement");
					}
					else {
						if(!_.isString(step.element)) throw new Error('each step must have an element');
						if(!(_.isString(step.placement) || _.isFunction(step.placement))) throw new Error('each step must have a placement');
						if(_.isString(step.placement) && !_.includes(['top', 'right', 'bottom', 'left'], step.placement)) throw new Error('incorrect placement');
					}
					if(!(_.isString(step.content) || _.isFunction(step.content))) throw new Error('each step must have content');
					step.title = config.title;
					if(stepsUsePath) step.path = '/#' + step.path;

					if(_.isFunction(step.onNext)) {
						var nextFn = step.onNext;
						step.onNext = function () { $rootScope.$apply(nextFn); };
					}
					if(_.isFunction(step.onPrev)) {
						var prevFn = step.onPrev;
						step.onPrev = function () { $rootScope.$apply(prevFn); };
					}

					return step;
				}),
			});
			tour.init();
			registeredTours[config.name] = tour;
		};

		/**
		 * check to see if a tour is registered
		 *
		 * @param {String} name - the name of the registered tour
		 * @returns {Boolean} true if a tour is registered by that name, false if not
		 */
		tours.exists = function (name) {
			return registeredTours.hasOwnProperty(name);
		};

		/**
		 * start a tour
		 * bootstrap-tour is a bit quirky, or at least for our needs
		 *
		 * @param {String} name - the name of the registered tour
		 */
		tours.start = function (name) {
			var tour = registeredTours[name];
			if(tour) {
				/* istanbul ignore if: what would we be testing? this is an integration problem */
				if(!tour.ended()) tour.end();
				tour.restart();
			}
		};

		// bootstrap-tour silently fails on route change because the new element isn't on the page
		/* istanbul ignore next: tours will either work or not. this is an integration problem */
		$rootScope.$on('$routeChangeSuccess', function () {
			_.filter(registeredTours, isTourInProgress).forEach(forceRedraw);
		});

		/**
		 * bootstrap-tour doesn't have a better way to get this
		 * tour.ended only tells if you if it's finished
		 * - like, the tour has run and is now finished
		 * - restarting the tour also resets this
		 * there is no way to tell if a tour has started
		 */
		function isTourInProgress(tour) {
			// started, not ended
			return tour.getCurrentStep() && !tour.ended();
		}

		/**
		 * bootstrap-tour doesn't have a better way to get this
		 * tour.showStep doesn't do anything
		 * tour.redraw doesn't do the right thing
		 * this is the best i've found so far
		 */
		function forceRedraw(tour) {
			// if we do this during $routeChangeSuccess, it we get a digest in progress error
			// we need to delay it until later
			// which is probably the problem anyway, bootstrap tour failed to draw it, so we need to try again later
			$timeout(function () {
				tour.goTo(tour.getCurrentStep());
			});
		}

		return tours;
	}
});