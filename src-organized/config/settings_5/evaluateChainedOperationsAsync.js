/**
 * Evaluates a sequence of chained property accesses and function calls on an initial value, supporting optional chaining semantics.
 *
 * @param {Array} operationChain - An array representing the chain of operations. The first element is the initial value; subsequent elements are pairs of [operationType, operationFunction].
 *   operationType: 'access', 'optionalAccess', 'call', or 'optionalCall'.
 *   operationFunction: a function to apply for the operation.
 * @returns {Promise<any>} The result of evaluating the chained operations, or undefined if an optional chain short-circuits on nullish.
 */
async function evaluateChainedOperationsAsync(operationChain) {
  let lastContext = undefined; // Stores the previous context for method calls
  let currentValue = operationChain[0]; // Start with the initial value
  let index = 1;

  while (index < operationChain.length) {
    const operationType = operationChain[index];
    const operationFunction = operationChain[index + 1];
    index += 2;

    // If the operation is optional and the current value is nullish, short-circuit and return undefined
    if ((operationType === "optionalAccess" || operationType === "optionalCall") && currentValue == null) {
      return;
    }

    if (operationType === "access" || operationType === "optionalAccess") {
      // Save the current value as context for possible method calls
      lastContext = currentValue;
      // Perform property access (possibly async)
      currentValue = await operationFunction(currentValue);
    } else if (operationType === "call" || operationType === "optionalCall") {
      // Perform a function call, binding the last context as 'this'
      currentValue = await operationFunction((...args) => currentValue.call(lastContext, ...args));
      // Reset context after call
      lastContext = undefined;
    }
  }

  return currentValue;
}

module.exports = evaluateChainedOperationsAsync;