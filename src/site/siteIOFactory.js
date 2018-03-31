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

		// REVIEW is this the best way expose the methods for testing
		Object.defineProperty(siteIO, 'units', { value: {} });
		siteIO.units.load_1 = load_1;
		siteIO.units.save_1_0 = save_1_0;
		siteIO.units.save_1_1 = save_1_1;
		// save_1_2
		// load_2
		// save_2_0

		siteIO.save = function save() {
			return fileIO.downloadJson('poketypeSettings', siteIO.units.save_1_1());
		};

		siteIO.load = function load() {
			return fileIO.uploadJson().then(function (data) {
				if(!_.isString(data.version)) throw new Error('no version');
				if(!_.isString(data.date)) throw new Error('no date');

				var v = /(\d+)\.(\d+)/.exec(data.version);
				if(!v) throw new Error('invalid date format');
				if(+v[1] > 1) throw new Error('cannot load file, unknown version ' + data.version);

				// TODO try parsing date, we need it anyway

				switch(v[1]) {
					case '1': siteIO.units.load_1(data);
					// cannot get to the default
				}

				return data.date;
			});
		};

		return siteIO;


		// catalog of save and load functions
		//
		// save functions use version <load>.<save iteration>
		// load functions can handle any <load>.x
		// so load_1 should be able to handle save_1_0, save_1_1, save_1_2, save_1_3, and beyond
		// so load_2 will be able to handle save_2_0, save_2_1, etc
		// this way we can future proof our load functions
		//
		// imagine someone using a "current" dist and someone using an "outdated dist"
		// the "current" might save a file and "outdated" may try to load it
		// the "outdated" one may not have all the new features, but maybe it can still use most of it

		// some helper methods
		function loadPrimitive(fn, value, settingsKey) { if(fn(value)) settings[settingsKey] = value; }
		function loadListId(list, id, settingsKey) { if(_.some(list, { id: id })) settings[settingsKey] = id; }

		/** save_1_0 is really only for testing */
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
			// restore defaults
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
	}
});