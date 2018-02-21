define([
	'angular',
	'lodash',
	'./squareDirective',
	'./typesController',
	'./typesFactory',
], function (angular, _, squareDirective, typesController, typesFactory) {
	var module = angular.module('po_ke_type.types', []);

	module.directive('typeSquare', squareDirective);
	module.controller('po_ke_type.types.controller', typesController);
	module.factory('po_ke_type.types.factory', typesFactory);

	module.filter('rateDisplay', function () {
		return function rateDisplay(input) {
			if(!_.isNumber(input)) return '';

			switch(input) {
				case 1: return ''; // don't display 1s
				case 0.5: return '½'; // fancy
				case 0.25: return '¼'; // fancy
				default: return input; // expected 0, 2, 4
			}
		};
	});

	module.filter('rateStyle', function () {
		return function rateStyle(input, inverse) {
			if(!_.isNumber(input)) return '';

			if(inverse === true || inverse === 'inv' || inverse === 'inverse') {
				if(input !== 0) input = 1/input;
			}

			return 'rate-' + input*100;
		};
	});

	return module;
});