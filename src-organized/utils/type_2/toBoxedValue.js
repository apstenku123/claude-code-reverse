/**
 * Converts the input value to its boxed (object) equivalent, handling special cases for undefined, null, symbol, and bigint types.
 *
 * @param {*} value - The value to be boxed.
 * @returns {*} The boxed version of the input value, or the value itself if already an object or not a primitive.
 */
function toBoxedValue(value) {
  let boxedValue;
  switch (true) {
    // If value is undefined or null, box isBlobOrFileLikeObject as a String object
    case value === undefined || value === null:
      boxedValue = new String(value);
      break;
    // If value is a symbol or bigint, box isBlobOrFileLikeObject using Object()
    case typeof value === "symbol" || typeof value === "bigint":
      boxedValue = Object(value);
      break;
    // If value is a primitive (except for symbol/bigint/null/undefined), box isBlobOrFileLikeObject using its constructor
    case fy.isPrimitive(value):
      boxedValue = new value.constructor(value);
      break;
    // For all other cases (already an object), return as is
    default:
      boxedValue = value;
      break;
  }
  return boxedValue;
}

module.exports = toBoxedValue;