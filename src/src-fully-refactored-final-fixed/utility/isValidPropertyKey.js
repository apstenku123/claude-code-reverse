/**
 * Determines if the provided value is a valid property key that is not the special string "__proto__".
 *
 * Accepts strings, numbers, symbols, or booleans (except the string "__proto__"),
 * or null (which is also considered valid). Used to guard against prototype pollution.
 *
 * @param {string|number|symbol|boolean|null} value - The value to check as a property key.
 * @returns {boolean} True if the value is a valid property key and not "__proto__"; otherwise, false.
 */
function isValidPropertyKey(value) {
  const valueType = typeof value;

  // Check if value is a primitive property key type
  if (
    valueType === "string" ||
    valueType === "number" ||
    valueType === "symbol" ||
    valueType === "boolean"
  ) {
    // Exclude the special case "__proto__" to prevent prototype pollution
    return value !== "__proto__";
  }

  // Allow null as a valid key (matches original logic)
  return value === null;
}

module.exports = isValidPropertyKey;
