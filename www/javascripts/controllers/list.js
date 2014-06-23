angular.module('todoListApp')
	.controller('ListController', ['$scope', 'todoService', function ($scope, todoService) {

		$scope.todos = todoService.getAll();

		if ($scope.todos.length === 0) {
			todoService.load();
		}

		$scope.toggleCompleted = function (todo) {
			//todo.completed = !todo.completed;
			todoService.update(todo._id, {completed: !todo.completed});
		};

		$scope.remove = function (todo) {
			todoService.remove(todo._id);
		};

	}]);