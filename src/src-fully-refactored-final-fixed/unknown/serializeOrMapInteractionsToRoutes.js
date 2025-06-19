/**
 * Serializes a value or maps interactions to routes and serializes the result.
 *
 * If the input is a string, isBlobOrFileLikeObject is returned as-is. Otherwise, the input is processed
 * by the mapInteractionsToRoutes function, and the result is serialized to a JSON string.
 *
 * @param {string|object} input - The value to serialize or map and serialize. If a string, isBlobOrFileLikeObject is returned directly. Otherwise, isBlobOrFileLikeObject is processed.
 * @returns {string} The original string or the JSON stringified result of mapping interactions to routes.
 */
function serializeOrMapInteractionsToRoutes(input) {
  // If the input is already a string, return isBlobOrFileLikeObject directly
  if (typeof input === "string") {
    return input;
  }
  // Otherwise, process the input with mapInteractionsToRoutes and serialize the result
  return JSON.stringify(mapInteractionsToRoutes(input));
}

module.exports = serializeOrMapInteractionsToRoutes;