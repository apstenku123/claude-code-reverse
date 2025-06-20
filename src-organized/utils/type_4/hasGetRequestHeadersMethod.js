/**
 * Checks if the provided object has a 'getRequestHeaders' method.
 *
 * @param {object} targetObject - The object to check for the 'getRequestHeaders' method.
 * @returns {boolean} True if 'getRequestHeaders' exists and is a function, otherwise false.
 */
function hasGetRequestHeadersMethod(targetObject) {
  // Ensure the property 'getRequestHeaders' exists and is a function
  return (
    'getRequestHeaders' in targetObject &&
    typeof targetObject.getRequestHeaders === 'function'
  );
}

module.exports = hasGetRequestHeadersMethod;