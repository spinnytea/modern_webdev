define([], function () {
	return [BulbapediaDirective];

	function BulbapediaDirective() {
		return {
			restrict: 'A',
			replace: 'true',
			scope: { mon: '=bulbapedia' },
			template: '<a ng-href="http://bulbapedia.bulbagarden.net/wiki/{{mon.name}}_(Pok%C3%A9mon)" target="bulbapedia"><i class="fa fa-external-link"></i></a>',
		};
	}
});