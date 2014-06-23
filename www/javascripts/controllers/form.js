angular.module('todoListApp')
	.controller('FormController', ['$scope', 'todoService', function ($scope, todoService) {

		$scope.isSubmitting = false;

		$scope.submitForm = function () {
            if ($scope.todoForm.$invalid !== true) {
                $scope.isSubmitting = true;
				todoService.store($scope.todo, function () {
                    $scope.isSubmitting = false;
                });
			}
		};

	}]);