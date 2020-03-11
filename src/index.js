function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    validateInputExpression(expr);
    let output = convertToReversePolishNotation(expr);
    return calculateFromPostFixedNotation(output);
}

function validateInputExpression(expr) {
    if (expr.includes(" / 0")) {
        throw ('TypeError: Division by zero.');
    }

    if (!parenthesesAreBalanced(expr)) {
        throw ("ExpressionError: Brackets must be paired");
    }
}

function parenthesesAreBalanced(expr) {
  var parentheses = "()",
    stack = [],
    i, character, bracePosition;

  for (i = 0; character = expr[i]; i++) {
    bracePosition = parentheses.indexOf(character);

    if (bracePosition === -1) {
      continue;
    }

    if (bracePosition % 2 === 0) {
      stack.push(bracePosition + 1);
    } else {
      if (stack.pop() !== bracePosition) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

function isOperatorOrBracket(с) {
    return "+-/*()".indexOf(с) != -1;
}

function isDelimiter(c) {
    return " =".indexOf(c) != -1;
}

function isCharDigit(c) {
    return !!c.trim() && c > -1;
}

function getPriority(c) {
    if (c == '*') return 2;
    if (c == '/') return 2;
    if (c == '+') return 1;
    if (c == '-') return 1;
    return 0;
}

function calculateByOperator(op, leftValue, rightValue) {
    let result = 0;
    switch (op) {
        case '+':
            result = rightValue + leftValue;
            break;
        case '-':
            result = rightValue - leftValue;
            break;
        case '*':
            result = rightValue * leftValue;
            break;
        case '/':
            result = rightValue / leftValue;
            break;
    }
    return result;
}

function calculateFromPostFixedNotation(input) {
    let values = [];

    for (let i = 0; i < input.length; i++) {
        if (isCharDigit(input[i])) {
            let a = "";

            while (!isDelimiter(input[i]) && !isOperatorOrBracket(input[i])) {
                a += input[i];
                i++;
                if (i == input.length) break;
            }
            values.push(a);
            i--;
        } else if (isOperatorOrBracket(input[i])) {

            let leftValue = parseFloat(values.pop());
            let rightValue = parseFloat(values.pop());

            values.push(calculateByOperator(input[i], leftValue, rightValue));
        }
    }
    return values[values.length - 1];
}

function convertToReversePolishNotation(expr) {
    var i = 0,
        nextToken = function() {
            while (i < expr.length && isDelimiter(expr[i])) i++;
            if (i == expr.length) return '';
            var token = '';
            while (i < expr.length && expr[i] != ' ' && !isOperatorOrBracket(expr[i])) {
              token += expr[i++];
            }
            if (token != '') return token;
            return expr[i++];
        };
    var tokensStack = [],
        outputStack = [],
        tok;
    while ((tok = nextToken()) != '') {
        if (tok == '(') {
          tokensStack.push(tok);
        } else if (tok == ')') {
            while (tokensStack.length > 0 && tokensStack[tokensStack.length - 1] != '(') {
              outputStack.push(tokensStack.pop());
            }
            if (tokensStack.length == 0) return 'Mismatched parenthesis.';
            tokensStack.pop();
        } else if (isOperatorOrBracket(tok)) {
            while (tokensStack.length > 0 && isOperatorOrBracket(tokensStack[tokensStack.length - 1]) && (getPriority(tok) <= getPriority(tokensStack[tokensStack.length - 1]))) {
              outputStack.push(tokensStack.pop());
            }
            tokensStack.push(tok);
        } else {
            outputStack.push(tok);
        }
    }
    while (tokensStack.length > 0) {
        if (!isOperatorOrBracket(tokensStack[tokensStack.length - 1])) {
          return 'Mismatched parenthesis.';
        }
        outputStack.push(tokensStack.pop());
    }
    var reversePolishNotation = '';
    for (var j = 0; j < outputStack.length; j++) {
        if (j != 0) reversePolishNotation += ' ';
        reversePolishNotation += outputStack[j];
    }
    return reversePolishNotation;
}

module.exports = {
    expressionCalculator
}
