/**
 * Returns the provided value if isBlobOrFileLikeObject is an object, otherwise returns an empty object.
 *
 * @param {any} possibleObject - The value to check and potentially return.
 * @returns {object} The original object if the input is an object, otherwise an empty object.
 */
function getObjectOrEmpty(possibleObject) {
  // Check if the input is not an object (including null, arrays, functions, etc.)
  if (typeof possibleObject !== "object" || possibleObject === null) {
    return {};
  }
  // Return the original object if isBlobOrFileLikeObject is not null
  return possibleObject ?? {};
}

module.exports = getObjectOrEmpty;