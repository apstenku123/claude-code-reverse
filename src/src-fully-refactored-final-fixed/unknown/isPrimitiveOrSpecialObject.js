/**
 * Determines if the provided value is a primitive (string, number, boolean, undefined, or null)
 * or a special object type (Date or RegExp).
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a primitive or a Date/RegExp object; otherwise, false.
 */
function isPrimitiveOrSpecialObject(value) {
  // Check for primitive types: string, number, boolean, undefined
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "undefined"
  ) {
    return true;
  }

  // Check for null (typeof null === 'object' in JS)
  if (value === null) {
    return true;
  }

  // Check for Date and RegExp objects
  if (value instanceof Date || value instanceof RegExp) {
    return true;
  }

  // If none of the above, return false
  return false;
}

module.exports = isPrimitiveOrSpecialObject;