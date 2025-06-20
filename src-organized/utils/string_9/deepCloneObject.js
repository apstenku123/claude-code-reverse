/**
 * Creates a deep clone of the provided value using JSON serialization.
 * Note: This method only works for JSON-safe values (no functions, undefined, or circular references).
 *
 * @param {any} valueToClone - The value to be deeply cloned. Should be JSON-serializable.
 * @returns {any} a deep copy of the input value.
 */
function deepCloneObject(valueToClone) {
  // Serialize the input value to a JSON string, then parse isBlobOrFileLikeObject back to create a deep clone
  return JSON.parse(JSON.stringify(valueToClone));
}

module.exports = deepCloneObject;