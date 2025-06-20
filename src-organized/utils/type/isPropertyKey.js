/**
 * Determines if the provided value can be used as a valid property key.
 *
 * @param {*} value - The value to check as a potential property key.
 * @param {Object} [object] - Optional object to check if the value exists as a property key.
 * @returns {boolean} Returns true if the value is a valid property key, otherwise false.
 */
function isPropertyKey(value, object) {
  // If value is an object-like structure (e.g., array, object), return false
  if (J8(value)) return false;

  const valueType = typeof value;

  // If value is a primitive (number, symbol, boolean), null, or a special object (Jy), return true
  if (
    valueType === "number" ||
    valueType === "symbol" ||
    valueType === "boolean" ||
    value == null ||
    Jy(value)
  ) {
    return true;
  }

  // If value matches the $y2 regex, or does not match the Ny2 regex,
  // or if an object is provided and value is a property key in that object, return true
  return (
    $y2.test(value) ||
    !Ny2.test(value) ||
    (object != null && value in Object(object))
  );
}

module.exports = isPropertyKey;