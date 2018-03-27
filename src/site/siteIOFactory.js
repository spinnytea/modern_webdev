define([], function () {
	return [
		'po_ke_type.utils.fileIO.factory',
		SiteIOFactory,
	];

	function SiteIOFactory(fileIO) {
		var siteIO = {};

		siteIO.save = function save() {
			return save_1_0();
		};

		siteIO.load = function load() {
			return load_1();
		};

		return siteIO;

		// catalog of save and load functions

		function save_1_0() {
			return fileIO.downloadJson('poketypeSettings', {
				version: '1_0',
				date: (new Date()).toISOString(), // TODO use momentjs
				settings: null,
				team: null,
			});
		}

		function load_1() {
			return fileIO.uploadJson().then(function (data) {
				console.log('success', data);
			});
		}
	}
});