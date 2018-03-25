define(['lodash'], function (_) {
	return [RegexFilter];

	function RegexFilter() {
		return function regex(array, query, termPath) {
			if(_.isString(query)) query = new RegExp(query, 'i');
			if(!_.isRegExp(query)) return array;

			// only return objects that match the regex query
			return array.filter(function (a) {
				var term = _.get(a, termPath);
				return !!query.exec(term);
			});
		};
	}
});