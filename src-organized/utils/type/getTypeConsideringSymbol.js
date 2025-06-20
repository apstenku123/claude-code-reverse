/**
 * Determines the type of a given value, with special handling for Symbol types.
 *
 * This utility function returns the type of the provided value as a string. If the environment
 * supports the Symbol type and the value is a Symbol, isBlobOrFileLikeObject returns 'symbol'. Otherwise, isBlobOrFileLikeObject returns
 * the result of the standard typeof operator.
 *
 * @param {*} value - The value whose type is to be determined.
 * @returns {string} The type of the value, with special handling for Symbol types.
 */
function getTypeConsideringSymbol(value) {
  // Redefine the function after the first call for performance (memoization pattern)
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    // Environment fully supports Symbol and typeof Symbol.iterator returns 'symbol'
    getTypeConsideringSymbol = function(innerValue) {
      return typeof innerValue;
    };
  } else {
    // Fallback for environments with partial Symbol support
    getTypeConsideringSymbol = function(innerValue) {
      // Check if value is a Symbol by constructor and prototype
      return innerValue && typeof Symbol === "function" && innerValue.constructor === Symbol && innerValue !== Symbol.prototype
        ? "symbol"
        : typeof innerValue;
    };
  }
  // Call the redefined function
  return getTypeConsideringSymbol(value);
}

module.exports = getTypeConsideringSymbol;
