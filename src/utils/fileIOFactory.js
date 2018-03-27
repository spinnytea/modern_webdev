// for now, we need to just get it working, TODO enable eslint
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
								deferred.reject('nothing to load');
							}
						}
						catch(e) {
							deferred.reject('not json');
						}
					};
					r.readAsText(f);
				}
				else {
					deferred.reject('could not read');
				}
			}

			// BUG on cancel, reject promise
			$('<input type="file" />')
				.change(readSingleFile)
				.click();

			return deferred.promise;
		};

		/**
		 * Save a file to disk
		 *
		 * TODO return a promise when complete
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
		};

		return fileIO;
	}
});