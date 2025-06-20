/**
 * Evaluates a sequence of chained property accesses and function calls on an initial value.
 *
 * The input is an array where the first element is the initial value, and the following elements
 * come in pairs: an operation type (e.g., 'access', 'call', 'optionalAccess', 'optionalCall')
 * and an operation function. The function applies these operations in order, handling optional
 * chaining semantics (i.e., short-circuiting if the value is nullish during an optional operation).
 *
 * @param {Array} operationChain - Array describing the chain of operations to perform.
 *   - operationChain[0]: The initial value to operate on.
 *   - operationChain[1..n]: Pairs of [operationType, operationFunction].
 *     operationType: string ('access', 'call', 'optionalAccess', 'optionalCall')
 *     operationFunction: function to apply for the operation.
 * @returns {any} The final value after applying all operations, or undefined if short-circuited by an optional operation.
 */
function evaluateChainedOperations(operationChain) {
  let lastContext = undefined; // Stores the context for function calls
  let currentValue = operationChain[0]; // Start with the initial value
  let index = 1;

  while (index < operationChain.length) {
    const operationType = operationChain[index];
    const operationFunction = operationChain[index + 1];
    index += 2;

    // If the operation is optional and the current value is nullish, short-circuit and return undefined
    if ((operationType === "optionalAccess" || operationType === "optionalCall") && currentValue == null) {
      return undefined;
    }

    if (operationType === "access" || operationType === "optionalAccess") {
      // For property access, update lastContext and currentValue
      lastContext = currentValue;
      currentValue = operationFunction(currentValue);
    } else if (operationType === "call" || operationType === "optionalCall") {
      // For function calls, bind the last context and update currentValue
      currentValue = operationFunction((...args) => currentValue.call(lastContext, ...args));
      lastContext = undefined;
    }
  }

  return currentValue;
}

module.exports = evaluateChainedOperations;
