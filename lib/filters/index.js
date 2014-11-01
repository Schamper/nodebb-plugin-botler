(function(Filters) {
	"use strict";

	var Utils = require('../utils'),

		Namespaces = {};

	Filters.list = function() {
		return Utils.iterateNamespace(Namespaces);
	};

	Filters.getNamespaces = function() {
		return Namespaces;
	};

	Utils.requireDir(__dirname, function(lib) {
		Namespaces[lib] = require('./' + lib);
	});

})(module.exports);