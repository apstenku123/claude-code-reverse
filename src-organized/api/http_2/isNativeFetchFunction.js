/**
 * Checks if the provided value is the native JavaScript fetch function.
 *
 * @param {any} possibleFetchFunction - The value to check, expected to be a function.
 * @returns {boolean} True if the value is the native fetch function, false otherwise.
 */
function isNativeFetchFunction(possibleFetchFunction) {
  // Ensure the input is truthy and its string representation matches the native fetch function signature
  const nativeFetchPattern = /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/;
  return Boolean(
    possibleFetchFunction &&
    nativeFetchPattern.test(possibleFetchFunction.toString())
  );
}

module.exports = isNativeFetchFunction;