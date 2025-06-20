/**
 * Checks if the provided value is a primitive type: number, boolean, or string.
 *
 * @param {any} value - The value to check for primitive type.
 * @returns {boolean} Returns true if the value is a number, boolean, or string; otherwise, false.
 */
function isPrimitiveType(value) {
  switch (typeof value) {
    case "number":
    case "boolean":
    case "string":
      // Return true if the value is a number, boolean, or string
      return true;
  }
  // Return false for all other types
  return false;
}

module.exports = isPrimitiveType;