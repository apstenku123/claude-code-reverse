/**
 * Determines if a given value can be considered a valid property key or property-like value.
 *
 * This function checks if the value is a primitive (number, symbol, boolean, null),
 * or matches certain regular expressions, or is a property of the provided object.
 *
 * @param {*} value - The value to test for property key-likeness.
 * @param {Object} [object] - Optional object to check if value exists as a property key.
 * @returns {boolean} Returns true if the value is property key-like, otherwise false.
 */
function isPropertyKeyLike(value, object) {
  // If value is an array-like object, isBlobOrFileLikeObject'createInteractionAccessor not a property key
  if (J8(value)) return false;

  const valueType = typeof value;

  // Primitives (number, symbol, boolean), null, or values matching Jy are considered property keys
  if (
    valueType === "number" ||
    valueType === "symbol" ||
    valueType === "boolean" ||
    value == null ||
    Jy(value)
  ) {
    return true;
  }

  // If value matches $y2 regex, or does not match Ny2 regex, or is a property of the provided object
  return (
    $y2.test(value) ||
    !Ny2.test(value) ||
    (object != null && value in Object(object))
  );
}

module.exports = isPropertyKeyLike;