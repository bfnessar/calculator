( function() {
  angular
    .module('myApp.view1')
    .factory('calculatorService', calculatorService);
  calculatorService.$inject = ['$http', '$q', '$rootScope'];

  function calculatorService($http, $q, $rootScope) {
    var CalculatorService = {
      'var1': '',

      func1: function(var) {

      },

    };

    return CalculatorService

  };

} () )
