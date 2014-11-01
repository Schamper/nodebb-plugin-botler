(function(Utils) {
	"use strict";

	var fs = require('fs'),
		async = require('async'),

		Config = require('./config'),
		NodeBB = require('./nodebb'),
		User = NodeBB.User,
		Plugins = NodeBB.Plugins,

		winston = NodeBB.winston;

	Utils.createUser = function(callback) {
		User.create({
			username: Config.settings.get('user.username'),
			password: Utils.generatePassword()
		}, function(err, uid) {
			if (err) {
				return callback(err);
			}

			User.getUserField(uid, 'username', function(err, username) {
				callback(null, {
					uid: uid,
					username: username
				});
			});
		});
	};

	Utils.generatePassword = function() {
		var password = '';
		for (var i = 0; i < 4; i++) {
			password += Math.random().toString(36).slice(-8);
		}
		return password;
	};

	Utils.changeUsername = function(newUsername, callback) {
		User.updateProfile(Config.settings.get('user.uid'), {
			username: newUsername
		}, callback);
	};

	Utils.getHookListeners = function(hook) {
		return Plugins.loadedHooks[hook];
	};

	Utils.requireDir = function(dir, yieldcb, callback) {
		fs.readdir(dir, function(err, files) {
			files.splice(files.indexOf('index.js'), 1);

			async.each(files, function(lib, next) {
				if (lib.substr(lib.length - 3) === '.js') {
					lib = lib.slice(0, -3);
					yieldcb(lib);
				}

				next();
			}, callback);
		});
	};

	Utils.iterateNamespace = function(ns) {
		var info = {};

		for (var ac in ns) {
			if (ns.hasOwnProperty(ac)) {
				info[ac] = ns[ac].info;
			}
		}

		return info;
	};

	Utils.iterateInfo = function(ns) {
		var ret = [];
		for (var key in ns) {
			if (ns.hasOwnProperty(key) && key != 'info') {
				ret.push(ns[key].info);
			}
		}

		return ret;
	};

	Utils.log = {
		prefix: '[plugins/nodebb-plugin-' + Config.plugin.id + '] ',
		info: function(message) {
			winston.info(Utils.log.prefix + message);
		},
		warn: function(message) {
			winston.warn(Utils.log.prefix + message);
		}
	}
})(module.exports);