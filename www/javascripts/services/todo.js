angular.module('todoListApp')
	.factory('todoService', [function () {


		//mocking some default todos
		var _todos = [{
			_id: 1,
			title: 'Learn AngularJS',
			completed: false,
			date: +(new Date())
		},
		{
			_id: 2,
			title: 'Watch "24" S09',
			completed: false,
			date: +(new Date()) + 1
		}, {
			_id: 3,
			title: 'Buy beer',
			completed: true,
			date: +(new Date()) + 2
		}];

		return {
			getAll: function () {
				return _todos;
			},

			load: function () {
				return _todos;
			},

			store: function (params, callback) {
                var cb = callback || angular.noop;
				var todo = angular.extend({}, params);
				if (!todo._id) {
					todo._id = _todos.length ? Math.max.apply(null, _todos.map(function (el) { return el._id; })) + 1 : 1;
				}
				_todos.push(todo);
                cb(false, todo);

			},

			reset: function () {
				_todos.length = 0;
			},

			get: function (id) {
				var ret = null;
				_todos.some(function (el) {
					if (el._id === id) {
						ret = el;
						return true;
					}
					return false;
				});
				return ret;
			},

			update: function (id, data) {
				var todo = this.get(id);

				angular.extend(todo, data || {});
			},

			remove: function (id) {
				var idx = null;

				_todos.some(function (el, i) {
					if (el._id === id) {
						idx = i;
						return true;
					} else {
						return false;
					}
				});
				if (angular.isNumber(idx)) {
					_todos.splice(idx, 1);
				}
			},

			getCompleted: function () {
				return _todos.filter(function (todo) {
					return todo.completed === true;
				}).length;
			}
		};

	}]);