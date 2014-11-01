(function(Log) {
	"use strict";

	var Utils = require('../utils');

	Log.info = {
		title: 'Log',
		desc: '',
		actions: Utils.iterateInfo(Log)
	};

	Log.log = {
		info: {
			id: 'log.log',
			title: 'Log',
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
			Utils.log.info(args.message);
		}
	};

})(module.exports);