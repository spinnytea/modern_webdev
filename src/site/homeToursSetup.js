define([], function () {
	return [
		'po_ke_type.utils.tours.factory',
		HomeToursFactory,
	];

	function HomeToursFactory(tours) {
		tours.register({
			name: 'homeIntro',
			title: 'My First Tour',
			steps: [{
				element: '[ng-bind="themeCount"]',
				content: 'Well... this is awkard',
			}, {
				element: '[ng-bind="pokedexCount"]',
				content: 'At least we got them all',
			}],
		});
	}
});