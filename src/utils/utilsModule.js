define([
	'angular',
	'lodash',
	'Tour',
	'./areYouSureDirective',
	'./bindKeysFactory',
	'./browserVersionFactory',
	'./btnDisabledTitleDirective',
	'./filterAllFilter',
	'./padNumberFilter',
	'./radioGroupDirective',
	'./toursFactory',
	'./tourStartDirective',
], function (
	angular,
	_,
	Tour,
	areYouSureDirective,
	bindKeysFactory,
	browserVersionFactory,
	btnDisabledTitleDirective,
	filterAllFilter,
	padNumberFilter,
	radioGroupDirective,
	toursFactory,
	tourStartDirective
) {
	var utilsModule = angular.module('po_ke_type.utils', [
		areYouSureDirective.name,
		btnDisabledTitleDirective.name,
		radioGroupDirective.name,
		tourStartDirective.name,
		'ngRoute',
		'cfp.hotkeys',
	]);

	utilsModule.constant('Tour', Tour); // shim requirejs dep into angular dep (enables testing)
	utilsModule.factory('bindKeys', bindKeysFactory);
	utilsModule.factory('po_ke_type.utils.browserVersion.factory', browserVersionFactory);
	utilsModule.filter('filterAll', filterAllFilter);
	utilsModule.filter('padNumber', padNumberFilter);
	utilsModule.factory('po_ke_type.utils.tours.factory', toursFactory);

	// TEST exception handler doesn't; to reproduce: import module name as controller dependency
	// - or is that a bad tests? also test: throw an error from inside a controller
	// module.factory('$exceptionHandler', function () {
	// 	return function UncaughtExceptionHandler(exception, cause) {
	// 		if(cause) { exception.message += ' (caused by "' + cause + '")'; }
	// 		throw exception;
	// 	};
	// });

	return utilsModule;
});