/**
 * Serializes a given value to a JSON string, ensuring isBlobOrFileLikeObject is JSON serializable.
 * Throws a TypeError if the value cannot be serialized.
 * Calls v_ to assert the result is a string (side effect).
 *
 * @param {any} value - The value to serialize to JSON.
 * @returns {string} The JSON string representation of the value.
 * @throws {TypeError} If the value is not JSON serializable.
 */
function serializeToJsonString(value) {
  // Attempt to serialize the input value to a JSON string
  const jsonString = JSON.stringify(value);

  // If serialization fails (returns undefined), throw an error
  if (jsonString === undefined) {
    throw new TypeError("Value is not JSON serializable");
  }

  // Call v_ to assert the type is string (side effect, as per original code)
  v_(typeof jsonString === "string");

  // Return the serialized JSON string
  return jsonString;
}

module.exports = serializeToJsonString;
