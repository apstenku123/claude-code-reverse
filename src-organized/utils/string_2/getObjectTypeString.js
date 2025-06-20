/**
 * Returns a string representing the internal [[Class]] of the given value, similar to Object.prototype.toString.call().
 * Special-cases null and undefined to return their respective type strings.
 *
 * @param {*} value - The value whose type string is to be determined.
 * @returns {string} The type string, e.g., "[object Array]", "[object Null]", "[object Undefined]", etc.
 */
function getObjectTypeString(value) {
  // Check for null or undefined explicitly, as Object.prototype.toString.call(null/undefined) returns their respective type strings
  if (value == null) {
    // If value is undefined, return '[object Undefined]'; otherwise, '[object Null]'
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  // For all other values, use Object.prototype.toString.call to get the type string
  return Object.prototype.toString.call(value);
}

module.exports = getObjectTypeString;