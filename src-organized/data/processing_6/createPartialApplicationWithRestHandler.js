/**
 * Creates a function that partially applies arguments to a target function, collects the rest,
 * processes them with a handler, and then invokes the target with the combined arguments.
 *
 * @param {Function} targetFunction - The function to partially apply arguments to and eventually invoke.
 * @param {number} [fixedArgCount=targetFunction.length-1] - The number of arguments to fix before collecting the rest.
 * @param {Function} restHandler - a function to process the collected rest arguments before passing them to the target.
 * @returns {Function} a new function that applies the described behavior.
 */
function createPartialApplicationWithRestHandler(targetFunction, fixedArgCount, restHandler) {
  // Ensure fixedArgCount is a non-negative integer, defaulting to targetFunction.length - 1
  const numFixedArgs = F2A(
    fixedArgCount === undefined ? targetFunction.length - 1 : fixedArgCount,
    0
  );

  return function partiallyAppliedFunction(...allArgs) {
    // Calculate how many arguments are considered 'rest' (after the fixed ones)
    const numRestArgs = F2A(allArgs.length - numFixedArgs, 0);
    // Collect the rest arguments
    const restArgs = Array(numRestArgs);
    for (let i = 0; i < numRestArgs; i++) {
      restArgs[i] = allArgs[numFixedArgs + i];
    }

    // Collect the fixed arguments
    const fixedArgs = Array(numFixedArgs + 1);
    for (let i = 0; i < numFixedArgs; i++) {
      fixedArgs[i] = allArgs[i];
    }
    // The last fixed argument is the result of processing the rest arguments
    fixedArgs[numFixedArgs] = restHandler(restArgs);

    // Call the target function with the combined arguments and preserve 'this'
    return t0A(targetFunction, this, fixedArgs);
  };
}

module.exports = createPartialApplicationWithRestHandler;