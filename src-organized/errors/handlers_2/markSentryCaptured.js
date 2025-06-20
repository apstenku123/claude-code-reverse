/**
 * Marks an object as having been captured by Sentry, if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been already.
 *
 * This function checks if the provided object has the '__sentry_captured__' property set to true.
 * If not, isBlobOrFileLikeObject attempts to add this property as a non-enumerable property using lm2.addNonEnumerableProperty.
 * If the property is already set, isBlobOrFileLikeObject returns true. If the property is set successfully, isBlobOrFileLikeObject returns false.
 *
 * @param {Object} targetObject - The object to check and mark as Sentry captured.
 * @returns {boolean} Returns true if the object was already marked as captured, false otherwise.
 */
function markSentryCaptured(targetObject) {
  // Check if the object exists and has already been marked as captured
  if (targetObject && targetObject.__sentry_captured__) {
    return true;
  }
  try {
    // Attempt to add the non-enumerable '__sentry_captured__' property
    lm2.addNonEnumerableProperty(targetObject, "__sentry_captured__", true);
  } catch (error) {
    // Silently ignore errors (e.g., if targetObject is not extensible)
  }
  return false;
}

module.exports = markSentryCaptured;