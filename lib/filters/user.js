(function (User) {
	"use strict";

	var Utils = require('../utils');

	User.info = {
		title: 'Field',
		desc: '',
		filters: Utils.iterateInfo(User)
	};

	User.equals = {
		info: {
			id: 'user.equals',
			title: 'Is user',
			desc: '',
			arguments: {
				uid: {
					type: 'user',
					title: '',
					desc: ''
				},
				equals: {
					type: 'user',
					title: '',
					desc: ''
				}
			}
		},
		func: function(args, data, callback) {
			var uid = args.uid,
				equals = args.equals;

			if (!uid || !equals) {
				return callback(false);
			}

			return callback(uid == equals);
		}
	};

})(module.exports);