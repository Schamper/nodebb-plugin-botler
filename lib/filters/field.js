(function (Field) {
	"use strict";

	var Utils = require('../utils');

	Field.info = {
		title: 'Field',
		desc: '',
		filters: Utils.iterateInfo(Field)
	};

	Field.equals = {
		info: {
			id: 'field.equals',
			title: 'Equals',
			desc: '',
			arguments: {
				field: {
					type: 'text',
					title: '',
					desc: ''
				},
				equals: {
					type: 'text',
					title: '',
					desc: ''
				}
			}
		},
		func: function(args, data, callback) {
			var field = args.field,
				equals = args.equals;

			if (!field || !equals) {
				return callback(false);
			}

			// Don't check strictly. This makes it easier to check integers etc.
			return callback(field == equals);
		}
	};

})(module.exports);