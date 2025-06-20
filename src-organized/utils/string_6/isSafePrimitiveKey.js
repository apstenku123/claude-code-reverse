/**
 * Checks if the provided value is a primitive (string, number, symbol, or boolean) and not the string "__proto__",
 * or if the value is exactly null.
 * This is typically used to determine if a value is a safe key for object properties,
 * avoiding prototype pollution via "__proto__".
 *
 * @param {string|number|symbol|boolean|null} value - The value to check for safe usage as an object key.
 * @returns {boolean} True if the value is a safe primitive key or null, false otherwise.
 */
function isSafePrimitiveKey(value) {
  const valueType = typeof value;
  // Check if value is a primitive type that can be used as an object key
  if (
    valueType === "string" ||
    valueType === "number" ||
    valueType === "symbol" ||
    valueType === "boolean"
  ) {
    // Exclude the dangerous "__proto__" string to prevent prototype pollution
    return value !== "__proto__";
  }
  // Allow null as a safe value
  return value === null;
}

module.exports = isSafePrimitiveKey;