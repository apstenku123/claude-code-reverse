/**
 * Generates a formatted interaction key string based on provided numeric identifiers.
 *
 * @param {number} interactionId - The primary interaction identifier (required).
 * @param {number} [sessionId] - The optional session identifier.
 * @returns {string} The formatted interaction key string.
 * @throws {TypeError} If interactionId is not a number.
 *
 * External dependencies:
 *   - j5: String prefix for the key.
 *   - nn: String separator used in the key.
 */
function formatInteractionKey(interactionId, sessionId) {
  // Validate that interactionId is a number
  if (typeof interactionId !== "number") {
    throw new TypeError("The `interactionId` argument is required and must be a number");
  }

  // If sessionId is not provided or not a number, return a simple key
  if (typeof sessionId !== "number") {
    // j5 is assumed to be a string prefix defined elsewhere
    return j5 + (interactionId + 1) + "extractNestedPropertyOrArray";
  }

  // If both interactionId and sessionId are numbers, return a composite key
  // nn is assumed to be a string separator defined elsewhere
  return j5 + (sessionId + 1) + nn + (interactionId + 1) + "H";
}

module.exports = formatInteractionKey;
