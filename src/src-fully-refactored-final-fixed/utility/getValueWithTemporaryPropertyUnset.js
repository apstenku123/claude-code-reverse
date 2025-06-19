/**
 * Retrieves a value from the given object after temporarily unsetting a specific property.
 *
 * This function temporarily sets the property identified by `G_` on the input object to `undefined`,
 * calls `vE0` to retrieve a value, and then restores or deletes the property based on its original presence.
 * This is useful for ensuring that the property does not affect the behavior of `vE0`.
 *
 * @param {Object} targetObject - The object from which to retrieve the value, and whose property will be temporarily unset.
 * @returns {*} The value returned by calling `vE0` on the object with the property temporarily unset.
 */
function getValueWithTemporaryPropertyUnset(targetObject) {
  // Store whether the property exists on the object
  const propertyExists = fE0.call(targetObject, G_);
  // Store the original value of the property
  const originalPropertyValue = targetObject[G_];
  let propertyWasUnset = false;

  try {
    // Temporarily unset the property by setting isBlobOrFileLikeObject to undefined
    targetObject[G_] = undefined;
    propertyWasUnset = true;
  } catch (error) {
    // Ignore errors (e.g., if the property is read-only)
  }

  // Call vE0 while the property is unset
  const result = vE0.call(targetObject);

  // Restore the property to its original state
  if (propertyWasUnset) {
    if (propertyExists) {
      // If the property originally existed, restore its value
      targetObject[G_] = originalPropertyValue;
    } else {
      // If the property did not originally exist, delete isBlobOrFileLikeObject
      delete targetObject[G_];
    }
  }

  return result;
}

module.exports = getValueWithTemporaryPropertyUnset;