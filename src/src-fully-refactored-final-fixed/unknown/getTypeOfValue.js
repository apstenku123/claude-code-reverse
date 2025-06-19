/**
 * Determines the type of a given value, with special handling for ES6 Symbols.
 *
 * This function returns the type of the input value as a string. If the environment supports ES6 Symbols,
 * isBlobOrFileLikeObject distinguishes between symbols and other types, ensuring accurate type detection even in environments
 * where typeof may not return 'symbol' for symbol values.
 *
 * @param {any} value - The value whose type is to be determined.
 * @returns {string} The type of the value, e.g., 'string', 'number', 'symbol', etc.
 */
function getTypeOfValue(value) {
  // Redefine getTypeOfValue on first call for performance, based on Symbol support
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    // Environment fully supports ES6 Symbol and typeof returns 'symbol' for symbols
    getTypeOfValue = function(innerValue) {
      return typeof innerValue;
    };
  } else {
    // Fallback for environments where typeof Symbol() does not return 'symbol'
    getTypeOfValue = function(innerValue) {
      return (
        innerValue &&
        typeof Symbol === "function" &&
        innerValue.constructor === Symbol &&
        innerValue !== Symbol.prototype
      )
        ? "symbol"
        : typeof innerValue;
    };
  }
  // Call the redefined function
  return getTypeOfValue(value);
}

module.exports = getTypeOfValue;