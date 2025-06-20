/**
 * Ensures the provided value is an object, or returns an empty object if not.
 *
 * @param {any} value - The value to check and return if isBlobOrFileLikeObject is an object.
 * @returns {object} The original object if the input is an object, otherwise an empty object.
 */
function ensureObjectOrEmpty(value) {
  // Check if the value is of type 'object' (excluding null)
  if (typeof value !== "object" || value === null) {
    return {};
  }
  // Return the value if isBlobOrFileLikeObject'createInteractionAccessor a non-null object, or an empty object if value is null/undefined
  return value ?? {};
}

module.exports = ensureObjectOrEmpty;