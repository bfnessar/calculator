angular.module('myApp')
  .directive('calculator', function() {
    return {
      restrict: 'EA',
      templateUrl: '/components/calculator.html',
      scope: {
        model: '='
      }
    }
  })
