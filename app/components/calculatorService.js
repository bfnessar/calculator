/*
  Examples: 10+3*4+21/7*3-4+8*2 becomes 10 3 4 * 21 7 3 * / 4 8 2 * + - + +
*/

( function() {
  angular
    .module('myApp.view1')
    .factory('calculatorService', calculatorService);
  calculatorService.$inject = ['$http', '$q', '$rootScope'];

  function calculatorService($http, $q, $rootScope) {
    var CalculatorService = {
      'inputstring': '',
      'result': 'asdfsadf',

      validateCharacters(string) {
        // Validate characters
        var invalid_chars = /[^\d*\+\-\*\/\s]/;
        if (string.match(invalid_chars)) {
          console.log("invalid chars");
          return false;
        }
        else {
          console.log("characters are valid!");
          // Also make sure it goes /NUM OPER NUM/+
          return string;
        }
      },

      tokenify(string) {
        // Splits the string into single characters (multi-digit numbers are not yet grouped)
        var trimmed_string = string.replace(/\s+/g, "");
        var char_array = trimmed_string.split("");
        var token_array = [];
        var current_token = '';
        var current_char = '';

        // Iterate over each character in the condensed expression
        for (var i=0; i<char_array.length; i++) {
          current_char = char_array[i];

          if (current_char.match(/[\d]/)) {
            current_token += current_char; // Concat this digit to the current number token
            if (i==char_array.length-1) {
              token_array.push(current_token);
            }
          }
          else if (current_char.match(/[\+\-\/\*]/)) { // Operands are separated by operators
            token_array.push(current_token);
            token_array.push(current_char);
            current_token = '';
          }
        }
        return token_array;
      },

      validateExpression(tokens_infix) {
        if (tokens_infix.length < 1){
          return false;
        };
        for (var i=0; i < token_array.length; i++) {
          if (token_array[0].match(/[^\d*]/)) {
            return false;
          }
        }
      },

      calculateButton(string) {
        var myself = this;

        string = this.validateCharacters(string);
        var token_array = this.tokenify(string);

        // Convert expression into postfix. See http://csis.pace.edu/~wolf/CS122/infix-postfix.htm
        var operator_stack = [];
        var output_list = [];
        for (var i=0; i<token_array.length; i++) {
          var current_token = token_array[i];
          if (current_token.match(/\d+/)){
            output_list.push(current_token);
          }

          else {
            while (operator_stack.length > 0 &&  operator_stack[operator_stack.length-1].match(/[\+\-\*\/]/)) {
              // While priority of current <= stackhead, pop.
              if (current_token.match(/[\+\-]/)) { // +- will always be <= stackhead
                output_list.push( operator_stack.pop() )
              }
              else if (current_token.match(/[\*\/]/) && operator_stack[operator_stack.length-1].match(/[\*\/]/) ) {
                // */ has higher priority than +-
                output_list.push( operator_stack.pop() );
              }
              else {
                break;
              };
            }
            operator_stack.push(current_token);
          }
        }

        while (operator_stack.length > 0 ) {
          output_list.push( operator_stack.pop() );
        };
        console.log(output_list.toString());
        /*  Valid for outputs:
              5+3*2-1 = 10
              2*4-5+1 = 4
              20/4+4*10/2 = 25
              10*3-5+4*2-30/15 = 31

        */

        // Output
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
