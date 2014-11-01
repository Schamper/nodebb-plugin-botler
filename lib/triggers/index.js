(function(Triggers) {
	"use strict";

	var Brain = require('../brain'),
		Utils = require('../utils');

	Triggers.ns = {
		posts: require('./posts')(Triggers)
	};

	Triggers.list = function() {
		return Utils.iterateNamespace(Triggers.ns);
	};

	Triggers.submitQuery = function(data, info) {
		Brain.process({
			trigger: info.id,
			data: data
		});
	};

})(module.exports);