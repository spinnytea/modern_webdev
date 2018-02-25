define(['angular', 'lodash'], function (angular, _) {
	var utilsModule = angular.module('po_ke_type.utils', [
		'ngRoute',
		'cfp.hotkeys',
	]);

	// TODO why doesn't this work? TEST import module name as controller dependency
	// module.factory('$exceptionHandler', function () {
	// 	return function UncaughtExceptionHandler(exception, cause) {
	// 		if(cause) { exception.message += ' (caused by "' + cause + '")'; }
	// 		throw exception;
	// 	};
	// });

	utilsModule.factory('bindKeys', ['hotkeys', function (hotkeys) {
		// XXX allow fn to be a string and use $scope[fn]?
		return function BindKeys($scope, keys) {
			var bound = hotkeys.bindTo($scope);
			_.forEach(keys, function (fn, key) {
				bound.add({
					combo: key,
					allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
					callback: fn,
				});
			});
		};
	}]);

	utilsModule.directive('btn', [function () {
		return {
			restrict: 'C',
			link: function BtnDisabledTitleLink($scope, elem, attr) {
				if(('title' in attr) && ('ngDisabled' in attr)) {
					var span = elem.wrap('<span/>').parent();
					$scope.$on('$destroy', $scope.$watch(function () { return attr.title; }, function (title) {
						span.attr('title', title);
					}));
				}
			},
		};
	}]);

	utilsModule.filter('padNumber', function () {
		return function (input, length) {
			input = +input;
			length = +length;
			if(!_.isNumber(input) || !_.isNumber(length))
				return input;

			input = ''+input;
			while(input.length < length)
				input = '0'+input;

			return input;
		};
	});

	utilsModule.filter('filterAll', ['$filter', function ($filter) {
		$filter = $filter('filter');
		return function FilterAll(array, query) {
			if(!_.isString(query)) return array;
			var qs = query.split(' ');

			// only return objects that have ALL the query substrings
			return array.filter(function (a) {
				return qs.every(function (q) {
					return $filter([a], q).length;
				});
			});
		};
	}]);

	utilsModule.directive('areYouSure', ['$q', function ($q) {
		return {
			restrict: 'A',
			replace: true,
			transclude: true,
			scope: { callback: '@areYouSure' },
			template: '<button ng-click="theCheck()" ng-mouseleave="reset()">' +
			'<ng-transclude ng-if="step === 1"></ng-transclude>' +
			'<span ng-if="step === 2"><i class="fa fa-fw fa-question-circle"></i>Are you sure</span>' +
			'<span ng-if="step === 3"><i class="fa fa-fw fa-refresh fa-spin"></i>Working</span>' +
			'<span ng-if="step === 4"><i class="fa fa-fw fa-check"></i>Done</span>' +
			'<span ng-if="step === 5"><i class="fa fa-fw fa-exclamation-circle"></i>Error</span>' +
			'</button>',
			controller: ['$scope', AreYouSureController],
		};

		function AreYouSureController($scope) {
			$scope.step = 1;
			$scope.reset = function () { if($scope.step !== 3) $scope.step = 1; };
			$scope.theCheck = function () {
				if($scope.step === 1) {
					$scope.step = 2;
				}
				else if($scope.step === 2) {
					$scope.step = 3;
					// promisify the callback
					$q.resolve().then(function () {
						try {
							return $scope.$parent.$eval($scope.callback);
						}
						catch(e) {
							return $q.reject(e);
						}
					}).then(function () {
						$scope.step = 4;
					}).catch(function () {
						$scope.step = 5;
					});
				}
			};
		}
	}]);

	return utilsModule;
});