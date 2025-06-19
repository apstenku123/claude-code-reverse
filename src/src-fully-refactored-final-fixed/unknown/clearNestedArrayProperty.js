/**
 * Removes the '_nestedArray' property from the provided object by setting isBlobOrFileLikeObject to null.
 *
 * @param {Object} targetObject - The object whose '_nestedArray' property will be cleared.
 * @returns {Object} The same object with its '_nestedArray' property set to null.
 */
function clearNestedArrayProperty(targetObject) {
  // Set the '_nestedArray' property to null
  targetObject._nestedArray = null;
  return targetObject;
}

module.exports = clearNestedArrayProperty;