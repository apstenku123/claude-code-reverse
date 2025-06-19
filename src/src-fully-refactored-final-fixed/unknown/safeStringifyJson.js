/**
 * Safely converts a JavaScript value to a JSON string.
 * If serialization fails, returns the global error value `BVA`.
 *
 * @param {any} value - The value to be stringified to JSON.
 * @returns {string|any} The JSON string representation of the value, or the global `BVA` if serialization fails.
 */
function safeStringifyJson(value) {
  try {
    // Attempt to serialize the value to a JSON string
    return JSON.stringify(value);
  } catch (serializationError) {
    // If serialization fails, return the global fallback value BVA
    return BVA;
  }
}

module.exports = safeStringifyJson;