'use strict';
var _ = require('lodash');

var customRules = module.exports = [];

// customRules.push({
// 	id: 'test-rule',
// 	description: 'test rule.',
// 	init: function (parser, reporter){
// 		var self = this;
// 		parser.addListener('tagstart', function (event){
// 			var tagName = event.tagName.toLowerCase();
// 			if(tagName === 'body') {
// 				reporter.warn('Found body.', event.line, event.col, self, event.raw);
// 			}
// 		});
// 	},
// });

customRules.push({
	id: 'btn-danger-confirm',
	description: 'danger buttons should have confirmation',
	init: function (parser, reporter){
		var self = this;
		parser.addListener('tagstart', function (event){
			var clazz = _.find(event.attrs, { name: 'class' });
			if(clazz && _.includes(clazz.value, 'btn-danger')) {
				var hasConform = _.some(event.attrs, { name: 'are-you-sure' });
				if(!hasConform) {
					reporter.warn('Danger buttons should use are-you-sure.', event.line, event.col, self, event.raw);
				}
			}
		});
	},
});
