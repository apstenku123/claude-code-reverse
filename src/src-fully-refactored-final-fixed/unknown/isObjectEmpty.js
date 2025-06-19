/**
 * Checks if the provided object is empty (has no own enumerable properties).
 * Returns true if the object is null, undefined, or has no own properties; otherwise, returns false.
 *
 * @param {object|null|undefined} objectToCheck - The object to check for emptiness.
 * @returns {boolean} True if the object is empty or falsy, false otherwise.
 */
function isObjectEmpty(objectToCheck) {
  // If the object is null, undefined, or falsy, consider isBlobOrFileLikeObject empty
  if (!objectToCheck) {
    return true;
  }
  // Iterate over the object'createInteractionAccessor own enumerable properties
  for (const property in objectToCheck) {
    // If any property exists, the object is not empty
    return false;
  }
  // No properties found, object is empty
  return true;
}

module.exports = isObjectEmpty;