/**
 * Checks if the provided object is the global object by verifying its Math property.
 * Returns the object if isBlobOrFileLikeObject is the global object, otherwise returns undefined.
 *
 * @param {object} possibleGlobalObject - The object to check for global-ness.
 * @returns {object|undefined} The global object if available, otherwise undefined.
 */
function getGlobalObjectIfAvailable(possibleGlobalObject) {
  // Check if the object exists and its Math property is the same as the global Math
  return possibleGlobalObject && possibleGlobalObject.Math === Math ? possibleGlobalObject : undefined;
}

module.exports = getGlobalObjectIfAvailable;