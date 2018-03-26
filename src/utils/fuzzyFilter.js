define(['fuzzysearch'], function (fuzzysearch) {
	var FuzzySearch = fuzzysearch.FuzzySearch;
	var levenshteinFS = fuzzysearch.LevenshteinFS;
	var indexOfFS = fuzzysearch.IndexOfFS;
	// var wordCountFS = fuzzysearch.WordCountFS;
	var sift3FS = fuzzysearch.Sift3FS;

	return [FuzzyFilter];

	/* istanbul ignore next: the filter either work or not. this is an integration problem */
	function FuzzyFilter() {
		// XXX we should make this more like $filter, we should search more places on the object
		// - this is provided by default in the api
		// - we may need to create multiple search objects and merge the results
		return function fuzzy(array, query, termPath) {
			if(!query) return array;

			// XXX I have no idea what any of this configuration is for; it's copy-pasta from the example
			var fuzzySearch = new FuzzySearch(array, { 'minimumScore': 300, 'termPath': termPath, 'caseSensitive': false });
			fuzzySearch.addModule(levenshteinFS({ 'maxDistanceTolerance': 3, 'factor': 3 }));
			fuzzySearch.addModule(indexOfFS({ 'minTermLength': 3, 'maxIterations': 500, 'factor': 3 }));
			// fuzzySearch.addModule(wordCountFS({'maxWordTolerance': 3, 'factor': 1}));
			fuzzySearch.addModule(sift3FS({ 'maxDistanceTolerance': 3, 'factor': 1 }));

			var result = fuzzySearch.search(query);
			if(!result) return array;

			return result.map(function (r) {
				// r.value.$rank = r.score;
				return r.value;
			});
		};
	}
});