/**
 * Temporarily unsets a property on the given object, calls a function, then restores or deletes the property as appropriate.
 *
 * @param {Object} targetObject - The object whose property will be temporarily unset.
 * @returns {any} The result of calling Qj2 with the target object.
 */
function withTemporaryPropertyUnset(targetObject) {
  // Check if the property exists directly on the object
  const hasOwnProperty = Bj2.call(targetObject, gp);
  // Store the original property value
  const originalPropertyValue = targetObject[gp];
  let propertyWasUnset = false;

  try {
    // Temporarily unset the property
    targetObject[gp] = undefined;
    propertyWasUnset = true;
  } catch (error) {
    // If unsetting fails (e.g., property is read-only), ignore
  }

  // Call the dependent function while the property is unset
  const result = Qj2.call(targetObject);

  // Restore or delete the property if isBlobOrFileLikeObject was successfully unset
  if (propertyWasUnset) {
    if (hasOwnProperty) {
      // Restore the original value if isBlobOrFileLikeObject existed
      targetObject[gp] = originalPropertyValue;
    } else {
      // Otherwise, remove the property
      delete targetObject[gp];
    }
  }

  return result;
}

module.exports = withTemporaryPropertyUnset;