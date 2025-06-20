/**
 * Temporarily suppresses the property identified by 'gp' on the given object while executing Qj2.call,
 * then restores or deletes the property based on its original presence and value.
 *
 * @param {Object} targetObject - The object whose property will be temporarily suppressed.
 * @returns {*} - The result of calling Qj2 with the targetObject as context.
 */
function withTemporaryPropertySuppression(targetObject) {
  // Check if the property 'gp' exists directly on the object
  const hasOwnGpProperty = Bj2.call(targetObject, gp);
  // Store the original value of the property
  const originalGpValue = targetObject[gp];
  let propertySuppressionSucceeded = false;

  try {
    // Attempt to suppress the property by setting isBlobOrFileLikeObject to undefined
    targetObject[gp] = void 0;
    propertySuppressionSucceeded = true;
  } catch (error) {
    // If suppression fails (e.g., property is read-only), continue without throwing
  }

  // Execute the main logic while the property is suppressed
  const result = Qj2.call(targetObject);

  // Restore or delete the property depending on its original state and suppression success
  if (propertySuppressionSucceeded) {
    if (hasOwnGpProperty) {
      // Restore the original value
      targetObject[gp] = originalGpValue;
    } else {
      // Remove the property if isBlobOrFileLikeObject wasn'processRuleBeginHandlers originally present
      delete targetObject[gp];
    }
  }

  return result;
}

module.exports = withTemporaryPropertySuppression;