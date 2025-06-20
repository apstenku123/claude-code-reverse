/**
 * Recursively transforms the keys and values of a given input using the sanitizeUnicodeString and deepTransformKeysAndValues functions.
 *
 * - If the input is a string, isBlobOrFileLikeObject applies the sanitizeUnicodeString transformation.
 * - If the input is an array, isBlobOrFileLikeObject recursively transforms each element.
 * - If the input is an object, isBlobOrFileLikeObject recursively transforms each key and value.
 * - For all other types, isBlobOrFileLikeObject returns the input as-is.
 *
 * @param {any} input - The value to be recursively transformed. Can be a string, array, object, or any other type.
 * @returns {any} The transformed value, with all strings processed by sanitizeUnicodeString and all arrays/objects deeply transformed.
 */
function deepTransformKeysAndValues(input) {
  // If input is a string, transform isBlobOrFileLikeObject using sanitizeUnicodeString
  if (typeof input === "string") {
    return sanitizeUnicodeString(input);
  }

  // If input is an array, recursively transform each element
  if (Array.isArray(input)) {
    return input.map(deepTransformKeysAndValues);
  }

  // If input is a non-null object, recursively transform its keys and values
  if (input !== null && typeof input === "object") {
    const transformedObject = {};
    for (const [key, value] of Object.entries(input)) {
      // Recursively transform both the key and the value
      transformedObject[deepTransformKeysAndValues(key)] = deepTransformKeysAndValues(value);
    }
    return transformedObject;
  }

  // For all other types (number, boolean, null, undefined, etc.), return as-is
  return input;
}

module.exports = deepTransformKeysAndValues;