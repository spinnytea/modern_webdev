/* eslint-disable */
// for now, we need to just get it working, TODO enable eslint
define(['angular'], function (angular) {
	return [
		'$q',
		FileIOFactory,
	];

	function FileIOFactory($q) {
		var fileIO = {};

		/**
		 * Load a file from disk
		 *
		 * @returns {Promise.<Object>} when complete
		 */
		fileIO.uploadJson = function uploadJson() {
			var deferred = $q.defer(),
				e = document.createEvent('MouseEvents'),
				a = document.createElement('input');

			function readSingleFile(evt) {
				// Retrieve the first (and only!) File from the FileList object
				var f = evt.target.files[0];

				if (f) {
					var r = new FileReader();
					r.onload = function (e) {
						var contents = e.target.result;
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
			// BUG tried uploading 16k image, didn't fail, didn't do anything
			a.type = 'file';
			a.addEventListener('change', readSingleFile, false);
			e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);

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

			console.log(filename);

			var blob = new Blob([data], { type: 'text/json' }),
				e = document.createEvent('MouseEvents'),
				a = document.createElement('a');

			a.download = filename;
			a.href = window.URL.createObjectURL(blob);
			a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
			e.initMouseEvent('click', true, false, window,
				0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);
		};

		return fileIO;
	}
});