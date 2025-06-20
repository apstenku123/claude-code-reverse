/**
 * Creates a partially applied function that collects trailing arguments into an array,
 * transforms them using a provided function, and then invokes a target function with the result.
 *
 * @param {Function} targetFunction - The function to be invoked with the transformed arguments.
 * @param {number} [startIndex] - The index at which to start collecting trailing arguments. Defaults to targetFunction.length - 1.
 * @param {Function} transformTrailingArgs - Function to transform the collected trailing arguments array.
 * @returns {Function} a new function that applies the described behavior.
 */
function createPartialApplicationWithTransform(targetFunction, startIndex, transformTrailingArgs) {
  // Ensure startIndex is a valid non-negative integer
  const effectiveStartIndex = F2A(startIndex === undefined ? targetFunction.length - 1 : startIndex, 0);

  return function partiallyAppliedFunction(...args) {
    // Number of trailing arguments to collect
    const trailingArgsCount = F2A(args.length - effectiveStartIndex, 0);
    // Collect trailing arguments starting from effectiveStartIndex
    const trailingArgs = Array(trailingArgsCount);
    for (let i = 0; i < trailingArgsCount; i++) {
      trailingArgs[i] = args[effectiveStartIndex + i];
    }

    // Prepare the arguments array for the target function
    const appliedArgs = Array(effectiveStartIndex + 1);
    for (let i = 0; i < effectiveStartIndex; i++) {
      appliedArgs[i] = args[i];
    }
    // Transform trailing arguments and assign to the last parameter
    appliedArgs[effectiveStartIndex] = transformTrailingArgs(trailingArgs);

    // Call the target function with the prepared arguments and correct context
    return t0A(targetFunction, this, appliedArgs);
  };
}

module.exports = createPartialApplicationWithTransform;