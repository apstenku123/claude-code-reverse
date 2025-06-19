/**
 * Checks if the provided value is a primitive (string, number, symbol, or boolean) and not the string "__proto__",
 * or if the value is exactly null.
 *
 * This function is useful for safely determining if a value is a valid primitive key or a null value,
 * while protecting against prototype pollution via the "__proto__" property.
 *
 * @param {string|number|symbol|boolean|null|any} value - The value to check for validity.
 * @returns {boolean} Returns true if the value is a primitive (excluding "__proto__") or null, otherwise false.
 */
function isValidPrimitiveOrNull(value) {
  const valueType = typeof value;

  // Check for primitive types: string, number, symbol, boolean
  if (
    valueType === "string" ||
    valueType === "number" ||
    valueType === "symbol" ||
    valueType === "boolean"
  ) {
    // Exclude the dangerous "__proto__" string to prevent prototype pollution
    return value !== "__proto__";
  }

  // If not a primitive, return true only if value is exactly null
  return value === null;
}

module.exports = isValidPrimitiveOrNull;
