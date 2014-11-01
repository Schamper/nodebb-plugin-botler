(function(Shoutbox) {
	"use strict";

	var NodeBB = require('../nodebb'),
		SocketPlugins = NodeBB.SocketPlugins,

		Config = require('../config'),
		Utils = require('../utils');

	Shoutbox.info = {
		title: 'Shoutbox',
		desc: '',
		actions: Utils.iterateInfo(Shoutbox)
	};

	Shoutbox.shout = {
		info: {
			id: 'shoutbox.shout',
			title: 'Shout',
			desc: '',
			arguments: {
				message: {
					type: 'text',
					title: '',
					desc: ''
				}
			}
		},
		func: function(args) {
			if (args.message && SocketPlugins['shoutbox'] != undefined) {
				execute('send', {
					message: args.message
				}, function(err, result) {});
			}
		}
	};

	function execute(method, data, callback) {
		SocketPlugins['shoutbox'][method](
			generateFakeSocket(),
			data,
			callback
		);
	}

	function generateFakeSocket() {
		return {
			isBot: true,
			uid: Config.settings.get('user.uid'),
			on: function(message){},
			emit: function(message){}
		}
	}
})(module.exports);