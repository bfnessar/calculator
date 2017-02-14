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
        var invalid_chars = /[^\d*\+\-\*\/\s]/;
        if (string.match(invalid_chars)) {
          console.log("invalid chars");
          return false;
        }
        else {
          console.log("characters are valid!");
        }

        // Splits the string into single characters (multi-digit numbers are not yet grouped)
        var trimmed_string = string.replace(/\s+/g, "");
        var char_array = trimmed_string.split("");
        console.log(char_array);

        var token_array = [];
        var current_token = '';
        var current_char = '';

        // Iterate over each character in the condensed expression
        for (var i=0; i<char_array.length; i++) {
          current_char = char_array[i];

          if (current_char.match(/[\d]/)) {
            current_token += current_char;
            if (i==char_array.length-1) {
              token_array.push(current_token);
            }
          }

          else if (current_char.match(/[\+\-\/\*]/)) {
            token_array.push(current_token);
            token_array.push(current_char);
            current_token = '';
          }
        }

        console.log(token_array);

        // Calculate
        // Convert expressin into postfix. See http://csis.pace.edu/~wolf/CS122/infix-postfix.htm
        var operator_stack = [];
        var postfix_list = [];
        for (var i=0; i<token_array.length; i++) {
          var current_token = token_array[i];
          if (current_token.match(/d+/)){
            postfix_list.push(current_token);
          }

          else if (current_token.match(/[\*\/]/)){

          }

          else if (current_token.match(/[\+\-]/)) {
            if (operator_stack[operator_stack.length].match(/[\*\/]/)){
              postfix_list.push( operator_stack.pop() );
            }
            else {
              operator_stack.push(current_token);
            }
          }
        }




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
