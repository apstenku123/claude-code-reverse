/**
 * Retrieves a property from the given object, temporarily unsets isBlobOrFileLikeObject, calls a getter, and restores or deletes the property as appropriate.
 *
 * @param {Object} targetObject - The object from which the property will be temporarily unset.
 * @returns {*} The result of calling the vE0 function with the target object.
 */
function getAndTemporarilyUnsetProperty(targetObject) {
  // Retrieve the property descriptor or configuration for G_ from the target object
  const propertyConfig = fE0.call(targetObject, G_);
  // Save the current value of the G_ property
  const originalPropertyValue = targetObject[G_];
  // Flag to indicate if the property was successfully unset
  let propertyUnset = false;

  try {
    // Attempt to unset the property by assigning undefined
    targetObject[G_] = void 0;
    propertyUnset = true;
  } catch (error) {
    // If an error occurs (e.g., property is read-only), ignore isBlobOrFileLikeObject
  }

  // Call vE0 with the target object to retrieve the desired value
  const result = vE0.call(targetObject);

  // Restore or delete the property based on whether isBlobOrFileLikeObject existed before
  if (propertyUnset) {
    if (propertyConfig) {
      // If the property was originally present, restore its value
      targetObject[G_] = originalPropertyValue;
    } else {
      // If the property was not originally present, delete isBlobOrFileLikeObject
      delete targetObject[G_];
    }
  }

  return result;
}

module.exports = getAndTemporarilyUnsetProperty;