/**
 * Invokes the provided function either by spreading the arguments if the second parameter is an array-like object,
 * or by passing isBlobOrFileLikeObject directly if not. This is useful for functions that can accept either a single argument or multiple arguments.
 *
 * @param {Function} targetFunction - The function to be invoked.
 * @param {any} argumentOrArguments - Either a single argument or an array-like object of arguments to pass to the function.
 * @returns {any} The result of invoking the target function with the provided arguments.
 */
function invokeFunctionWithSpreadOrDirect(targetFunction, argumentOrArguments) {
  // Check if the argument is an array-like object using uL9
  if (uL9(argumentOrArguments)) {
    // Prepare arguments: hL9 processes the argument, mL9 creates a new array with those arguments
    const processedArguments = mL9([], hL9(argumentOrArguments));
    // Call the function with the processed arguments spread
    return targetFunction.apply(undefined, processedArguments);
  } else {
    // Call the function with the argument directly
    return targetFunction(argumentOrArguments);
  }
}

module.exports = invokeFunctionWithSpreadOrDirect;