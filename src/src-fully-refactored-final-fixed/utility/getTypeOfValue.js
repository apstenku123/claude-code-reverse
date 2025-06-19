/**
 * Determines the type of a given value as a string, with special handling for Symbol types.
 * This ensures compatibility across different JavaScript environments, especially for Symbol detection.
 *
 * @param {*} value - The value whose type is to be determined.
 * @returns {string} The type of the value as a string (e.g., 'string', 'number', 'symbol', etc.).
 */
function getTypeOfValue(value) {
  // Check if the environment supports Symbol and Symbol.iterator is of type 'symbol'
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    // Modern environments: typeof will correctly return 'symbol' for Symbol values
    getTypeOfValue = function(innerValue) {
      return typeof innerValue;
    };
  } else {
    // Legacy environments: need to check for Symbol constructor explicitly
    getTypeOfValue = function(innerValue) {
      // If the value is a Symbol (constructor is Symbol and not Symbol.prototype), return 'symbol'
      if (
        innerValue &&
        typeof Symbol === "function" &&
        innerValue.constructor === Symbol &&
        innerValue !== Symbol.prototype
      ) {
        return "symbol";
      }
      // Fallback to default typeof
      return typeof innerValue;
    };
  }
  // Call the memoized function with the original value
  return getTypeOfValue(value);
}

module.exports = getTypeOfValue;