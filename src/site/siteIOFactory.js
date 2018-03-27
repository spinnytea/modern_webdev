define(['lodash'], function (_) {
	return [
		'po_ke_type.utils.fileIO.factory',
		'po_ke_type.site.settings.factory', 'po_ke_type.site.settings.defaults',
		'po_ke_type.pokedex.team.factory', 'po_ke_type.pokedex.factory',
		SiteIOFactory,
	];

	function SiteIOFactory(fileIO,
			settings, defaults,
			team, pokedex) {
		var siteIO = {};

		// we only need to save the latest version
		// but we want to retain the old functions for the future
		// REVIEW we need to test this, so hopefully we can remove the voids?
		void(save_1_0);
		siteIO.save = function save() {
			return fileIO.downloadJson('poketypeSettings', save_1_1());
		};

		siteIO.load = function load() {
			return fileIO.uploadJson().then(function (data) {
				if(!_.isString(data.version)) throw new Error('no version');
				if(!_.isString(data.date)) throw new Error('no date');
				// TODO try parsing version, then convert string starts with to load version number
				// TODO try parsing date, we need it anyway

				if(_.startsWith(data.version, '1.')) {
					return load_1(data);
				}
				else {
					throw new Error('cannot load file, unknown version ' + data.version);
				}
			});
		};

		return siteIO;

		// catalog of save and load functions
		// TODO document saveIO version
		// - save function use version <load>.<save iteration>
		// - load function can handle any <load>.x

		/**
		 * save_1_0 is really only for testing
		 */
		function save_1_0() {
			return {
				version: '1.0',
				date: (new Date()).toISOString(), // TODO use momentjs
				settings: null,
				team: null,
			};
		}

		function save_1_1() {
			return {
				version: '1.1',
				date: (new Date()).toISOString(), // TODO use momentjs
				settings: _.pick(settings, _.keys(defaults)),
				team: team.map(function (mon) { return _.pick(mon, ['name', 'specialname']); }),
			};
		}

		function load_1(data) {
			console.log('success', data); // TODO remove
			_.assign(settings, defaults);
			team.splice(0);

			if(_.isObject(data.settings)) {
				// each setting needs it's own validation
				loadPrimitive(_.isBoolean, data.settings.colorfulCards, 'colorfulCards');
				loadListId(settings.pokedexGenerations, data.settings.dexGen, 'dexGen');
				loadListId(settings.availableDexFilters, data.settings.pokedexFilterType, 'pokedexFilterType');
				loadListId(settings.pokedexSortOrders, data.settings.pokedexOrderBy, 'pokedexOrderBy');
				loadListId(settings.availableTypeCharts, data.settings.preferredTypeChart, 'preferredTypeChart');
				loadPrimitive(_.isBoolean, data.settings.showTourStart, 'showTourStart');
				if(_.includes(settings.themes, data.settings.theme)) settings.theme = data.settings.theme;
			}

			if(_.isArray(data.team)) {
				Array.prototype.push.apply(team, _.chain(data.team)
					.map(function (m) { return _.find(pokedex.list, m); }) // convert from minimal to current list
					.compact() // remove invalid lines
					.uniq() // no dups
					.value());
			}
		}

		function loadPrimitive(fn, value, settingsKey) { if(fn(value)) settings[settingsKey] = value; }
		function loadListId(list, id, settingsKey) { if(_.some(list, { id: id })) settings[settingsKey] = id; }
	}
});