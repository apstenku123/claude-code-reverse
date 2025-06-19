/**
 * Attempts to call the external function `f9A` with the provided argument and returns the result as an object.
 * If `f9A` is not defined or falsy, returns an empty object instead.
 *
 * @param {any} inputValue - The value to be passed as an argument to the external function `f9A`.
 * @returns {object} The result of calling `f9A` with `inputValue` wrapped as an object, or an empty object if `f9A` is not available.
 */
function callFunctionOrReturnEmptyObject(inputValue) {
  // Check if the external function `f9A` exists and is truthy
  if (f9A) {
    // Call `f9A` with `inputValue` as its context and wrap the result as an object
    return Object(f9A.call(inputValue));
  }
  // If `f9A` is not available, return an empty object
  return {};
}

module.exports = callFunctionOrReturnEmptyObject;