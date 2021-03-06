define(['angular', 'jquery'], function (angular, $) {
	return [
		'$q', '$window',
		FileIOFactory,
	];

	function FileIOFactory($q, $window) {
		var fileIO = {};

		/**
		 * Load a file from disk
		 *
		 * @returns {Promise.<Object>} when complete
		 */
		fileIO.uploadJson = function uploadJson() {
			var deferred = $q.defer();

			function readSingleFile(evt) {
				// Retrieve the first (and only!) File from the FileList object
				var f = evt.target.files[0];

				if (f) {
					var r = new FileReader();
					r.onload = function (evt2) {
						var contents = evt2.target.result;
						try {
							var parsed = JSON.parse(contents);
							if(angular.isObject(parsed)) {
								deferred.resolve(parsed);
							}
							else {
								deferred.reject(new Error('nothing to load'));
							}
						}
						catch(e) {
							deferred.reject(new Error('not json'));
						}
					};
					r.readAsText(f);
				}
				else {
					deferred.reject(new Error('could not read'));
				}
			}

			// BUG on cancel, reject promise
			// - the internet says there's no way to do this from the input
			// - we can ONLY detect a file change, and we can only set a file with a dialog
			// - since we are creating the object for every click, there's no way to seed the value for change
			// - maybe we can register a focus event on the body, and reject the promise if it hasn't resolved
			$('<input type="file" />')
				.change(readSingleFile)
				.click();

			return deferred.promise;
		};

		/**
		 * Save a file to disk
		 *
		 * @param {String} name - name of the file
		 * @param {Object} data - data to save
		 */
		fileIO.downloadJson = function downloadJson(name, data) {
			data = JSON.stringify(data, null, 2);
			var filename = name+'.json';

			var blob = new Blob([data], { type: 'text/json' });
			var href = $window.URL.createObjectURL(blob);

			var a = $('<a>')
				.attr('download', filename)
				.attr('href', href)
				.attr('data-downloadurl', ['text/json', filename, href].join(':'));

			// don't ask me why jquery click doesn't work
			// don't ask me why there's a click function on the raw html element
			// but this needs to be called, while the jquery one does not work
			a[0].click();

			return $q.resolve(data);
		};

		return fileIO;
	}
});