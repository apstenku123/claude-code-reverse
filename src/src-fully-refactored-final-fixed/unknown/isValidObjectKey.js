/**
 * Checks if the provided value is a valid object key (excluding "__proto__").
 *
 * Accepts strings, numbers, symbols, or booleans (but not the string "__proto__"),
 * or null. Returns true if the value is a valid key, false otherwise.
 *
 * @param {string|number|symbol|boolean|null} possibleKey - The value to check as an object key.
 * @returns {boolean} True if the value is a valid object key, false otherwise.
 */
function isValidObjectKey(possibleKey) {
  const valueType = typeof possibleKey;
  // For primitive types (string, number, symbol, boolean),
  // check that the value is not the string "__proto__"
  if (
    valueType === "string" ||
    valueType === "number" ||
    valueType === "symbol" ||
    valueType === "boolean"
  ) {
    return possibleKey !== "__proto__";
  }
  // For all other types, only null is considered valid
  return possibleKey === null;
}

module.exports = isValidObjectKey;
