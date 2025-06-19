/**
 * Applies the provided function to the given argument. If the argument is array-like, spreads its elements as arguments to the function.
 *
 * @function applyFunctionWithSpreadIfArrayLike
 * @param {Function} targetFunction - The function to be invoked. Typically processes user interaction entries.
 * @param {*} inputValue - The value to pass to the function. If array-like, its elements are spread as arguments.
 * @returns {*} The result of invoking the function with the provided argument(createInteractionAccessor).
 */
function applyFunctionWithSpreadIfArrayLike(targetFunction, inputValue) {
  // Check if inputValue is array-like using uL9
  if (uL9(inputValue)) {
    // Prepare arguments: hL9 processes inputValue, mL9 returns a new array
    const processedArguments = mL9([], hL9(inputValue));
    // Call targetFunction with processedArguments spread
    return targetFunction.apply(undefined, processedArguments);
  } else {
    // Call targetFunction with inputValue as a single argument
    return targetFunction(inputValue);
  }
}

module.exports = applyFunctionWithSpreadIfArrayLike;