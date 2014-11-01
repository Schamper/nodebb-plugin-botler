(function(Brain) {
	"use strict";

	var async = require('async'),

		Actions = require('./actions'),
		Filters = require('./filters'),
		Config = require('./config'),
		Utils = require('./utils'),
		Log = Utils.log;

	Brain.process = function(query) {
		if (query.trigger) {
			// Incoming request, do we have a menu for this?
			var Menus = Config.settings.get('menus');

			if (Menus && Menus instanceof Array && Menus.length > 0) {
				Log.info('Got a new request, sir. Processing...');
				async.each(Menus, function(menu, next) {

					Log.info('Found a menu with name "' + menu.name + '".');

					if (query.trigger === menu.trigger.id) {
						// We have a menu! But does the master want special treatment?
						if (menu.trigger.filters.length > 0) {
							// Yes... Damn you master!
							filter(query.data, menu.trigger, menu);
						} else {
							Brain.serve(menu, query);
						}
					}

					next();
				});
			}
		}

		function filter(data, trigger, menu) {
			async.every(trigger.filters, function(filter, cb) {
				fireNsChild(filter, data, Filters.getNamespaces(), cb);
			}, function(result) {
				if (result) {
					Log.info('It looks like this menu is up to your standards, sir. I\'ll handle it from here.');
					Brain.serve(menu, query);
				} else {
					Log.info('This menu isn\'t up to your expectations, sir. I\'ll ignore it.');
				}
			});
		}
	};

	Brain.serve = function(menu, query) {
		for (var i = 0, l = menu.actions.length; i < l; i++) {
			fireNsChild(menu.actions[i], query.data, Actions.getNamespaces());
		}
	};

	function fireNsChild(item, data, namespaces, callback) {
		var parts = item.id.split('.');

		if (parts.length >= 2) {
			var ns = parts[0],
				name = parts[1];

			if (namespaces[ns] && namespaces[ns][name]) {
				var args = item.arguments;
				for (var arg in item.argumentMap) {
					if (item.argumentMap.hasOwnProperty(arg)) {
						args[arg] = data[item.argumentMap[arg]];
					}
				}

				namespaces[ns][name].func(args, data, callback);
			}
		}
	}

})(module.exports);