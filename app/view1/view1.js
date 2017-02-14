'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [
  '$scope', 'calculatorService',
  function($scope, calculatorService) {
    var vm = this;
    var calculator_instance = angular.copy(calculatorService);



  }
]);
