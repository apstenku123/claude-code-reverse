/**
 * Safely invokes a method on an object after temporarily removing a property, then restores or deletes the property as needed.
 *
 * @param {Object} targetObject - The object on which to operate.
 * @returns {any} The result of calling Qj2 on the target object.
 */
function safelyInvokeAndRestoreProperty(targetObject) {
  // Check if the property 'gp' exists directly on the object
  const hasOwnGpProperty = Bj2.call(targetObject, gp);
  // Store the original value of the 'gp' property
  const originalGpValue = targetObject[gp];
  let propertyWasRemoved = false;

  try {
    // Temporarily remove the 'gp' property by setting isBlobOrFileLikeObject to undefined
    targetObject[gp] = void 0;
    propertyWasRemoved = true;
  } catch (error) {
    // If setting the property fails (e.g., read-only), ignore the error
  }

  // Call Qj2 on the target object (presumably to perform some operation with 'gp' removed)
  const result = Qj2.call(targetObject);

  // Restore or delete the 'gp' property if isBlobOrFileLikeObject was successfully removed
  if (propertyWasRemoved) {
    if (hasOwnGpProperty) {
      // Restore the original value
      targetObject[gp] = originalGpValue;
    } else {
      // Remove the property entirely if isBlobOrFileLikeObject wasn'processRuleBeginHandlers originally present
      delete targetObject[gp];
    }
  }

  return result;
}

module.exports = safelyInvokeAndRestoreProperty;