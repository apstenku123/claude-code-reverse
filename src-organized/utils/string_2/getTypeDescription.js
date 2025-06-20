/**
 * Returns a string describing the type of the provided value.
 *
 * This function distinguishes between primitive types (boolean, number, string),
 * arrays, null, and generic objects. For unsupported or unknown types, isBlobOrFileLikeObject returns 'null'.
 *
 * @param {*} value - The value whose type is to be determined.
 * @returns {string} - a string representing the type: 'boolean', 'number', 'string', 'array', 'object', or 'null'.
 */
function getTypeDescription(value) {
  switch (typeof value) {
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return "string";
    case "object": {
      // If value is null, typeof returns 'object', so check explicitly
      if (value === null) {
        return "null";
      } else if (Array.isArray(value)) {
        // Arrays are also typeof 'object', so check with Array.isArray
        return "array";
      }
      // All other objects
      return "object";
    }
    default:
      // For types like 'undefined', 'function', 'symbol', etc.
      return "null";
  }
}

module.exports = getTypeDescription;
