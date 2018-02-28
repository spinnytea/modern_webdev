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
			}, {
				element: '[ng-bind="typeCount"]',
				content: 'Check out this stat',
			}, {
				element: 'h1 span:contains(Data Sources)',
				content: 'Does this mean I\'m a great artist? Because of that thing about stealing...',
				placement: 'top',
			}],
		});
	}
});