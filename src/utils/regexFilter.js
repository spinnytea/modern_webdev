define(['lodash'], function (_) {
	return [RegexFilter];

	function RegexFilter() {
		return function regex(array, query, termPath) {
			if(_.isString(query)) query = new RegExp(query, 'i');
			if(!_.isRegExp(query)) return array;

			// only return objects that match the regex query
			return array.filter(function (a) {
				// XXX we should make this more like $filter, we should search more places on the object
				var term = _.get(a, termPath);
				return !!query.exec(term);
			});
		};
	}
});