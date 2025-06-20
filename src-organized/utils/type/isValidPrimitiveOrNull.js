/**
 * Checks if the provided value is a valid primitive (string, number, symbol, or boolean) that is not the string "__proto__",
 * or if the value is exactly null.
 *
 * @param {*} value - The value to check for validity.
 * @returns {boolean} Returns true if the value is a valid primitive (excluding "__proto__") or null, otherwise false.
 */
function isValidPrimitiveOrNull(value) {
  const valueType = typeof value;

  // Check if value is a primitive type
  if (
    valueType === "string" ||
    valueType === "number" ||
    valueType === "symbol" ||
    valueType === "boolean"
  ) {
    // Exclude the string "__proto__" for security reasons
    return value !== "__proto__";
  }

  // If value is not a primitive, check if isBlobOrFileLikeObject is null
  return value === null;
}

module.exports = isValidPrimitiveOrNull;