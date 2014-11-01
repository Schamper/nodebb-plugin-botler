(function(Post) {
	"use strict";

	var NodeBB = require('../nodebb'),
		NbbPosts = NodeBB.Posts,

		Config = require('../config'),
		Utils = require('../utils');

	Post.info = {
		title: 'Log',
		desc: '',
		actions: Utils.iterateInfo(Post)
	};

	Post.new = {
		info: {
			id: 'post.new',
			title: 'New post',
			desc: '',
			arguments: {
				topic: {
					type: 'topic',
					title: '',
					desc: ''
				},
				content: {
					type: 'content',
					title: '',
					desc: ''
				}
			}
		},
		func: function(args) {
			if (args.content && args.topic) {
				NbbPosts.create({
					uid: Config.settings.get('user.uid'),
					tid: args.topic,
					content: args.content
				});
			}
		}
	};

})(module.exports);