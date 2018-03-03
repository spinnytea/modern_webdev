define(['angular'], function (angular) {
	var btnDisabledTitleMod = angular.module('po_ke_type.utils.btnDisabledTitle.directive', []);

	btnDisabledTitleMod.directive('btn', [BtnDisabledTitleDirective]);

	return btnDisabledTitleMod;

	function BtnDisabledTitleDirective() {
		return {
			restrict: 'C',
			link: BtnDisabledTitleLink,
		};
	}

	function BtnDisabledTitleLink($scope, elem, attr) {
		if(('title' in attr) && ('ngDisabled' in attr)) {
			var span = elem.wrap('<span/>').parent();
			$scope.$on('$destroy', $scope.$watch(function () { return attr.title; }, function (title) {
				span.attr('title', title);
			}));
		}
	}
});