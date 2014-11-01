(function(Config) {
	"use strict";

	var NodeBB = module.require('./nodebb'),
		pjson = require('../package.json'),

		Settings = NodeBB.Settings;

	Config.plugin = {
		name: 'The Botler',
		id: 'botler',
		version: pjson.version,
		description: pjson.description,
		icon: 'fa-terminal',
		route: '/botler',
		active: false
	};

	var defaults = {
		user: {
			setup: false,
			uid: 1,
			username: 'The Botler'
		},
		menus: [
			/*{
				name: 'Test menu',
				trigger: {
					id: 'posts.save',
					filters: [{
						id: 'user.equals',
						arguments: {
							equals: '1'
						},
						argumentMap: {
							uid: 'uid'
						}
					}]
				},
				actions: [
					{
						id: 'log.log',
						arguments: {

						},
						argumentMap: {
							message: 'content'
						}
					},
					{
						id: 'shoutbox.shout',
						arguments: {
							message: 'Hello, I\'m a bot.'
						}
					},
					{
						id: 'post.new',
						arguments: {
							topic: 3,
							content: 'Hello, I\'m a bot.'
						}
					}
				]
			}*/
		]

	};

	Config.settings = new Settings(Config.plugin.id, Config.plugin.version, defaults, null, true, true);

	Config.adminSockets = {
		sync: function() {
			Config.settings.sync();
		},
		getDefaults: function(socket, data, callback) {
			callback(null, Config.settings.createDefaultWrapper());
		}
	};

	Config.getTemplateData = function(callback) {
		callback({
			triggers: [
				{
					id: 'post',
					title: 'Post',
					events: [
						{
							id: 'newpost',
							title: 'New post'
						}
					]
				}
			]
		});
	};

})(module.exports);