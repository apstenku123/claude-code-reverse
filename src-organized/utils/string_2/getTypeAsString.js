/**
 * Returns a string representing the type of the provided value.
 * Handles primitives, arrays, null, and objects.
 *
 * @param {*} value - The value whose type is to be determined.
 * @returns {string} - a string representing the type: 'boolean', 'number', 'string', 'array', 'object', or 'null'.
 */
function getTypeAsString(value) {
  switch (typeof value) {
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return "string";
    case "object": {
      // Check for null (typeof null === 'object')
      if (value === null) {
        return "null";
      }
      // Check for arrays
      if (Array.isArray(value)) {
        return "array";
      }
      // All other objects
      return "object";
    }
    default:
      // For types like undefined, function, symbol, etc.
      return "null";
  }
}

module.exports = getTypeAsString;