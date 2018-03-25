define([
	'fuzzysearch/FuzzySearch',
	'fuzzysearch/LevenshteinFS',
	'fuzzysearch/IndexOfFS',
	// 'fuzzysearch/WordCountFS',
	'fuzzysearch/Sift3FS',
], function (
	FuzzySearch,
	levenshteinFS,
	indexOfFS,
	// wordCountFS,
	sift3FS
) {
	return [FuzzyFilter];

	// TODO We can't use this yet, because we need to get it in the browser
	// - requirejs uses a very specific dependency syntax (umd)
	// - FuzzySearch is written as a node module (commons)
	// - we need another require packager like browserify or babel to repackage it
	function FuzzyFilter() {
		return function fuzzy(array, query, termPath) {
			// XXX I have no idea what any of this configuration is for; it's copy-pasta from the example
			var fuzzySearch = new FuzzySearch(array, { 'minimumScore': 300, 'termPath': termPath, 'caseSensitive': false });
			fuzzySearch.addModule(levenshteinFS({ 'maxDistanceTolerance': 3, 'factor': 3 }));
			fuzzySearch.addModule(indexOfFS({ 'minTermLength': 3, 'maxIterations': 500, 'factor': 3 }));
			// fuzzySearch.addModule(wordCountFS({'maxWordTolerance': 3, 'factor': 1}));
			fuzzySearch.addModule(sift3FS({ 'maxDistanceTolerance': 3, 'factor': 1 }));

			return fuzzySearch.search(query).map(function (r) {
				// r.value.$rank = r.score;
				return r.value;
			});
		};
	}
});