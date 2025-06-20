/**
 * Creates a function that partially applies arguments and processes the rest with a handler.
 *
 * @param {Function} targetFunction - The function to be invoked with the processed arguments.
 * @param {number} [startIndex] - The index at which to start collecting the rest arguments. Defaults to targetFunction.length - 1.
 * @param {Function} restHandler - a function that processes the collected rest arguments.
 * @returns {Function} a new function that partially applies arguments and processes the rest with the handler.
 */
function createPartialArgsFunction(targetFunction, startIndex, restHandler) {
  // Ensure startIndex is a valid non-negative integer
  const effectiveStartIndex = F2A(
    startIndex === undefined ? targetFunction.length - 1 : startIndex,
    0
  );

  return function (...args) {
    // Calculate how many arguments will be collected as 'rest'
    const restCount = F2A(args.length - effectiveStartIndex, 0);
    // Collect the rest arguments starting from effectiveStartIndex
    const restArgs = Array(restCount);
    for (let i = 0; i < restCount; i++) {
      restArgs[i] = args[effectiveStartIndex + i];
    }

    // Collect the leading arguments up to effectiveStartIndex
    const leadingArgs = Array(effectiveStartIndex + 1);
    for (let i = 0; i < effectiveStartIndex; i++) {
      leadingArgs[i] = args[i];
    }
    // The last argument is the result of the restHandler
    leadingArgs[effectiveStartIndex] = restHandler(restArgs);

    // Call the target function with the constructed argument list
    return t0A(targetFunction, this, leadingArgs);
  };
}

module.exports = createPartialArgsFunction;