/**
 * Resets the '_nestedArray' property of the given object to null.
 *
 * This function is typically used to clear or invalidate any cached or temporary nested array data
 * stored on the object, ensuring that subsequent operations start with a clean state.
 *
 * @param {Object} targetObject - The object whose '_nestedArray' property will be reset.
 * @returns {Object} The same object, after its '_nestedArray' property has been set to null.
 */
function resetNestedArrayProperty(targetObject) {
  // Reset the '_nestedArray' property to null to clear any cached data
  targetObject._nestedArray = null;
  return targetObject;
}

module.exports = resetNestedArrayProperty;