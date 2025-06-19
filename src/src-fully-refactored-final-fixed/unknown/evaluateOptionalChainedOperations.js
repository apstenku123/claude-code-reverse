/**
 * Evaluates a sequence of property accesses and function calls, supporting optional chaining semantics.
 *
 * @param {Array} operationSequence - An array describing a chain of operations to perform. The first element is the initial value. Each subsequent pair consists of an operation type ("access", "optionalAccess", "call", "optionalCall") and a function to apply.
 * @returns {Promise<any>} The final value after applying all operations, or undefined if an optional chain short-circuits on nullish.
 */
async function evaluateOptionalChainedOperations(operationSequence) {
  let lastObjectContext = undefined; // Holds the previous object context for method calls
  let currentValue = operationSequence[0]; // Start with the initial value
  let index = 1;

  while (index < operationSequence.length) {
    const operationType = operationSequence[index];
    const operationFunction = operationSequence[index + 1];
    index += 2;

    // If the operation is optional and the current value is nullish, short-circuit and return undefined
    if ((operationType === "optionalAccess" || operationType === "optionalCall") && currentValue == null) {
      return undefined;
    }

    if (operationType === "access" || operationType === "optionalAccess") {
      // For property access, save the current object context and update the value
      lastObjectContext = currentValue;
      currentValue = await operationFunction(currentValue);
    } else if (operationType === "call" || operationType === "optionalCall") {
      // For function calls, bind the last object context as 'this' and call the function
      currentValue = await operationFunction((...args) => currentValue.call(lastObjectContext, ...args));
      lastObjectContext = undefined; // Reset context after call
    }
  }

  return currentValue;
}

module.exports = evaluateOptionalChainedOperations;