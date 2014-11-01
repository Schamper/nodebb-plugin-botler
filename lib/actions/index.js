(function(Actions) {
	"use strict";

	var Utils = require('../utils'),

		Namespaces = {};

	Actions.list = function() {
		return Utils.iterateNamespace(Namespaces);
	};

	Actions.getNamespaces = function() {
		return Namespaces;
	};

	Utils.requireDir(__dirname, function(lib) {
		Namespaces[lib] = require('./' + lib);
	});

})(module.exports);