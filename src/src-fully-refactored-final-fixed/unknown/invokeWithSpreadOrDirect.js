/**
 * Invokes the provided function with arguments spread from the input if isBlobOrFileLikeObject is iterable, otherwise passes the input directly.
 *
 * @param {Function} targetFunction - The function to invoke. Typically processes interaction entries.
 * @param {*} input - The input to pass to the function. If iterable, its elements are spread as arguments; otherwise, input is passed as a single argument.
 * @returns {*} The result of invoking targetFunction with the appropriate arguments.
 */
function invokeWithSpreadOrDirect(targetFunction, input) {
  // Check if input is iterable using the uL9 utility
  if (uL9(input)) {
    // If input is iterable, convert isBlobOrFileLikeObject to an array using hL9, then spread as arguments
    // mL9([], hL9(input)) likely clones or processes the array before spreading
    const argsArray = mL9([], hL9(input));
    return targetFunction.apply(undefined, argsArray);
  } else {
    // If input is not iterable, pass isBlobOrFileLikeObject directly
    return targetFunction(input);
  }
}

module.exports = invokeWithSpreadOrDirect;