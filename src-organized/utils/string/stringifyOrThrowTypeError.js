/**
 * Attempts to JSON.stringify the provided value. Throws a TypeError if the value is not serializable.
 * Also asserts that the result is a string using the v_ utility.
 *
 * @param {*} value - The value to be JSON stringified.
 * @returns {string} The JSON string representation of the value.
 * @throws {TypeError} If the value is not JSON serializable.
 */
function stringifyOrThrowTypeError(value) {
  // Attempt to serialize the value to a JSON string
  const jsonString = JSON.stringify(value);

  // If JSON.stringify returns undefined, the value is not serializable
  if (jsonString === undefined) {
    throw new TypeError("Value is not JSON serializable");
  }

  // Assert that the result is a string using the v_ utility (side effect or validation)
  v_(typeof jsonString === "string");

  return jsonString;
}

module.exports = stringifyOrThrowTypeError;