/**
 * Attempts to create an object by invoking a provided function with the given source as its context.
 * If the function is not defined, returns an empty object.
 *
 * @param {any} sourceContext - The context to be passed to the external function if isBlobOrFileLikeObject exists.
 * @returns {object} The object returned from the function call, or an empty object if the function is not available.
 */
function createObjectFromFunctionCall(sourceContext) {
  // Check if the external function 'f9A' exists
  if (typeof f9A === 'function') {
    // Call 'f9A' with 'sourceContext' as its 'this' value and wrap the result in Object()
    return Object(f9A.call(sourceContext));
  }
  // If 'f9A' is not defined, return an empty object
  return {};
}

module.exports = createObjectFromFunctionCall;