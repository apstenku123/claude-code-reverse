/**
 * Attempts to call the global function 'f9A' with the provided argument and returns the result as an object.
 * If 'f9A' is not defined or falsy, returns an empty object instead.
 *
 * @param {any} sourceValue - The value to pass as an argument to the 'f9A' function if isBlobOrFileLikeObject exists.
 * @returns {object} The result of calling 'f9A' with 'sourceValue', wrapped as an object, or an empty object if 'f9A' is not available.
 */
function getObjectFromFunctionOrEmpty(sourceValue) {
  // Check if the global function 'f9A' exists and is truthy
  if (typeof f9A === 'function') {
    // Call 'f9A' with 'sourceValue' and wrap the result as an object
    return Object(f9A.call(sourceValue));
  }
  // If 'f9A' does not exist, return an empty object
  return {};
}

module.exports = getObjectFromFunctionOrEmpty;