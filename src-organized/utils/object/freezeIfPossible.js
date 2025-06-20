/**
 * Attempts to freeze the provided object using the freeze method of the given object if available.
 * If the freeze method does not exist, returns the original object unchanged.
 *
 * @param {Object} targetObject - The object to potentially freeze.
 * @param {Object} [freezer=Object] - The object whose freeze method will be used. Defaults to the global Object.
 * @returns {Object} The frozen object if possible, otherwise the original object.
 */
function freezeIfPossible(targetObject, freezer = Object) {
  // Check if freezer exists and has a freeze method
  if (freezer && typeof freezer.freeze === "function") {
    return freezer.freeze(targetObject);
  }
  // If freezer is not provided or has no freeze method, return the object as is
  return targetObject;
}

module.exports = freezeIfPossible;
