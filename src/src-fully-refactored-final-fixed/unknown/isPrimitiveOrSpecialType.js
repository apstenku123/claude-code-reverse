/**
 * Determines if the provided value is a primitive (string, number, boolean, undefined, or null),
 * a Date object, or a RegExp object.
 *
 * @param {any} value - The value to check for primitive or special type.
 * @returns {boolean} True if the value is a primitive, Date, or RegExp; otherwise, false.
 */
function isPrimitiveOrSpecialType(value) {
  // Check for primitive types: string, number, boolean, undefined
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "undefined"
  ) {
    return true;
  }

  // Check for null (typeof null is 'object')
  if (value === null) {
    return true;
  }

  // Check for Date instance
  if (value instanceof Date) {
    return true;
  }

  // Check for RegExp instance
  if (value instanceof RegExp) {
    return true;
  }

  // If none of the above, return false
  return false;
}

module.exports = isPrimitiveOrSpecialType;