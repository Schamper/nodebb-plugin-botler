(function(Bot) {
	"use strict";

	var NodeBB = require('./lib/nodebb'),
		Config = require('./lib/config'),
		Utils = require('./lib/utils'),
		Triggers = require('./lib/triggers'),
		User = NodeBB.User,
		SocketAdmin = NodeBB.SocketAdmin;

	Bot.register = {
		load: function(app, middleware, controllers, callback) {
			function renderAdmin(req, res, next) {
				Config.getTemplateData(function(data) {
					res.render('admin/' + Config.plugin.id, data);
				});
			}

			if (!Config.settings.get('user.setup')) {
				//No bot user has been created yet
				createUser();
			} else {
				//Bot user already exists, or at least we think it does
				User.getUserField(Config.settings.get('user.uid'), 'username', function(err, username) {
					if (username) {
						//Alright user still exists, let's update the username in our config in case it was updated outside this plugin
						Config.settings.set('user.username', username);
						Config.settings.persist();
						finish();
					} else {
						//We were fooled! Attempt to recreate a user
						Config.settings.set('user.setup', false);
						Config.settings.persist();
						createUser();
					}
				});
			}

			callback(app, middleware, controllers);

			function createUser() {
				Utils.createUser(function(err, user) {
					if (err) {
						Utils.log.warn('Creating the bot user failed! It will be retried on the next restart. Messages will now be sent as uid 1');
						return finish();
					} else {
						Config.settings.set('user.uid', user.uid);
						Config.settings.set('user.username', user.username);
						Config.settings.set('user.setup', true);
						Config.settings.persist();

						Utils.log.info('Creating the bot was successful! Bot user created with username \'' +
							user.username + '\' and uid \'' + user.uid + '\'.');

						return finish();
					}
				});
			}

			function finish() {
				app.get('/admin' + Config.plugin.route, middleware.admin.buildHeader, renderAdmin);
				app.get('/api/admin' + Config.plugin.route, renderAdmin);

				SocketAdmin[Config.plugin.id] = Config.adminSockets;

				Config.plugin.active = true;
			}
		},
		admin: {
			addNavigation: function(custom_header, callback) {
				custom_header.plugins.push({
					route: Config.plugin.route,
					icon: Config.plugin.icon,
					name: Config.plugin.name
				});

				callback(null, custom_header);
			}
		}
	};

	Bot.triggers = Triggers.ns;

}(module.exports));
