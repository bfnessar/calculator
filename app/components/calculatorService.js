( function() {
  angular
    .module('myApp.view1')
    .factory('calculatorService', calculatorService);
  calculatorService.$inject = ['$http', '$q', '$rootScope'];

  function calculatorService($http, $q, $rootScope) {
    var CalculatorService = {
      'inputstring': '',
      'result': 'asdfsadf',

      calculateButton(string) {
        var myself = this;

        // Validate Input
        var token_array = string.split("");
        console.log(token_array);

        // Calculate


        // Output
        console.log("12345");
        this.result = "12345";
      },

      validateInput: function(string) {

      },

      calculate: function(string) {

      },

      dbg: function() {
        console.log("jkl;jkl;");
      },

    };

    console.log("dfadsfa");
    return CalculatorService;

  };

} () )
