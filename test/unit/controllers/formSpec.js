/*global jasmine, beforeEach, describe, expect, it, spyOn, inject, module */
describe('FormController tests', function() {
	var $rootScope, $scope, $controller, todoService, ctrl;

	beforeEach(function() {

		module('todoListApp');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			todoService = $injector.get('todoService');

			//force todo reset
			todoService.reset();

			$scope = $rootScope.$new();

			//mocking form controller
			$scope.todoForm = {
				$invalid: false,
				$valid: true,
				$dirty: false
			};



			ctrl = $controller('FormController', {
				'$scope': $scope,
				'todoService': todoService
			});
		});

	});


	it('should not add todos if form is invalid', function () {

		//set a spy on the `.store()` service method
		spyOn(todoService, 'store').andCallThrough();

		//force error state
		$scope.todoForm.$invalid = true;

		$scope.submitForm();
		expect(todoService.store).not.toHaveBeenCalled();
	});

	it('should add todos if form is invalid passing `todo` scope model', function () {

		//mock todo form object
		var todo = {
			'title': 'test title'
		};

		$scope.todo = todo;

		//set a spy on the `.store()` service method
		spyOn(todoService, 'store');

		$scope.submitForm();

		expect(todoService.store).toHaveBeenCalledWith(todo, jasmine.any(Function));

	});

	it('should have a method to verify submission state', function () {
		expect($scope.isSubmitting).toBeDefined();
	});

});

