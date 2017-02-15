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
      'postfix_notation': '',
      'result': 'result goes here',

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
        console.log("tokenified to: " + token_array);
        return token_array;
      },

      validateExpression(tokens_infix) {
        if (tokens_infix.length < 1){
          return false;
        };

        // First token must be operand
        if (!tokens_infix[0].match(/[\d]/)) {
          console.log("error: expression must begin with an operand");
          return false;
        }
        // Last token must be operand
        else if (tokens_infix[tokens_infix.length-1].match(/[^\d]/)){
          console.log("error: must end with an operand");
          return false;
        }

        for (var i=1; i < tokens_infix.length; i++) {
          var current_token = tokens_infix[i];
          var previous_token = tokens_infix[i-1];
          // console.log("current: " + current_token + ", prev: " + previous_token);

          if ( current_token.match(/[\d]/) && previous_token.match(/[\d]/) ) {
            console.log("error: two consecutive operands");
            return false;
          }
          else if ( !current_token.match(/[\d]/) && !previous_token.match(/[\d]/) ) {
            console.log("error: two consecutive operators");
            return false;
          }

        };
        console.log("expression is valid!");
        return true;
      },

      toPostfix(token_array) {
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
        /*  Valid for outputs:
              5+3*2-1 = 10
              2*4-5+1 = 4
              20/4+4*10/2 = 25
              10*3-5+4*2-30/15 = 31

        */
        this.postfix_notation = angular.copy(output_list.toString());
        return output_list;
      },

      calculatePostfixed(postfixed_array) {
        var token_stack = [];
        for (var i=0; i<postfixed_array.length; i++) {
          var current_token = postfixed_array[i];
          if (current_token.match(/[\d]/)) {
            token_stack.push(current_token);
          }
          else {
            var right_operand = parseFloat(token_stack.pop());
            var left_operand = parseFloat(token_stack.pop());
            var tmp_result;
            switch(current_token) {
              case '+': {
                tmp_result = left_operand + right_operand;
                break;
              }
              case '-': {
                tmp_result = left_operand - right_operand;
                break;
              }
              case '*': {
                tmp_result = left_operand * right_operand;
                break;
              }
              case '/': {
                tmp_result = left_operand / right_operand;
                break;
              }
            }
            console.log(`${left_operand} ${current_token} ${right_operand} = ${tmp_result}`);
            token_stack.push(tmp_result.toString());
          }
        }
        return tmp_result.toString();
      },

      calculateButton(string) {
        var myself = this;

        string = this.validateCharacters(string);
        if (!string) {
          return false;
        }
        var token_array = this.tokenify(string);
        if (!this.validateExpression(token_array)) {
          return false;
        }

        var postfixed_array = this.toPostfix(token_array);
        console.log(postfixed_array.toString());
        var result = this.calculatePostfixed(postfixed_array);
        console.log("result is: " + result);

        // Output
        this.result = result;
      },

    };

    return CalculatorService;

  };

} () )
