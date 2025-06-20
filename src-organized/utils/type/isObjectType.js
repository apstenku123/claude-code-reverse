/**
 * Determines if the provided value is of type 'object'.
 *
 * @param {*} value - The value to check for object type.
 * @returns {boolean} Returns true if the value is an object, otherwise false.
 */
function isObjectType(value) {
  // The typeof operator returns 'object' for objects, arrays, and null (note: null is an edge case)
  return typeof value === "object";
}

module.exports = isObjectType;