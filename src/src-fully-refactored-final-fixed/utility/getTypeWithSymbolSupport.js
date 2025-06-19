/**
 * Determines the type of a given value, with special handling for Symbol types.
 *
 * This utility function returns the type of the provided value. If the environment supports Symbols,
 * isBlobOrFileLikeObject ensures that Symbol values are correctly identified as 'symbol', even in environments where
 * typeof may not behave as expected. The function is self-redefining for performance optimization.
 *
 * @param {*} value - The value whose type is to be determined.
 * @returns {string} The type of the value, e.g., 'string', 'number', 'symbol', etc.
 */
function getTypeWithSymbolSupport(value) {
  // On first call, redefine the function for optimal performance based on environment capabilities
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    // Modern environments: typeof Symbol.iterator returns 'symbol' as expected
    getTypeWithSymbolSupport = function(innerValue) {
      return typeof innerValue;
    };
  } else {
    // Older environments: need to check if value is a Symbol instance
    getTypeWithSymbolSupport = function(innerValue) {
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
  // Call the redefined function with the original argument
  return getTypeWithSymbolSupport(value);
}

module.exports = getTypeWithSymbolSupport;
