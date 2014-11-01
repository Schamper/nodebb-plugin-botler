(function(module) {
	"use strict";

	var Posts = {},
		Triggers,

		Utils = require('../utils');

	Posts.info = {
		title: 'Posts',
		desc: '',
		triggers: Utils.iterateInfo(Posts)
	};

	Posts.save = {
		info: {
			id: 'posts.save',
			title: 'Save',
			desc: '',
			data: {
				pid: {
					type: 'post',
					title: '',
					desc: ''
				},
				uid: {
					type: 'user',
					title: '',
					desc: ''
				},
				tid: {
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
		func: function(post) {
			Triggers.submitQuery(post, Posts.save.info);
		}
	};

	Posts.upvote = {
		info: {
			id: 'posts.upvote',
			title: 'Upvote',
			desc: '',
			data: {
				pid: {
					type: 'post',
					title: '',
					desc: ''
				},
				uid: {
					type: 'user',
					title: '',
					desc: ''
				}
			}
		},
		func: function(pid, uid) {
			Triggers.submitQuery({
				pid: pid,
				uid: uid
			}, Posts.upvote.info);
		}
	};

	Posts.downvote = {
		info: {
			id: 'posts.downvote',
			title: 'Downvote',
			desc: '',
			data: {
				pid: {
					type: 'post',
					title: '',
					desc: ''
				},
				uid: {
					type: 'user',
					title: '',
					desc: ''
				}
			}
		},
		func: function(pid, uid) {
			Triggers.submitQuery({
				pid: pid,
				uid: uid
			}, Posts.downvote.info);
		}
	};

	module.exports = function(parent) {
		Triggers = parent;
		return Posts;
	};
})(module);