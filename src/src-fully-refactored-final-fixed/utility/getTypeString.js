/**
 * Returns a string representing the type of the provided value.
 *
 * This function distinguishes between booleans, numbers, strings, arrays, objects, and null values.
 * For objects, isBlobOrFileLikeObject checks for null and arrays specifically.
 *
 * @param {*} value - The value whose type is to be determined.
 * @returns {string} - a string representing the type: 'boolean', 'number', 'string', 'array', 'object', or 'null'.
 */
function getTypeString(value) {
  switch (typeof value) {
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return "string";
    case "object": {
      // Check for null explicitly, as typeof null === 'object'
      if (value === null) {
        return "null";
      } else if (Array.isArray(value)) {
        // Arrays are a special kind of object
        return "array";
      }
      // All other objects
      return "object";
    }
    default:
      // For types like 'undefined', 'function', or 'symbol', return 'null'
      return "null";
  }
}

module.exports = getTypeString;