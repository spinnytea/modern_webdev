define(['lodash'], function (_) {
	return ['$filter', AllWordsFilter];

	function AllWordsFilter($filter) {
		$filter = $filter('filter');
		return function allWords(array, query) {
			if(!_.isString(query)) return array;
			var qs = query.split(' ');

			// only return objects that have ALL the query substrings
			return array.filter(function (a) {
				return qs.every(function (q) {
					return $filter([a], q).length;
				});
			});
		};
	}
});