/**
 * Marks an object as having been captured by Sentry, if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been already.
 *
 * This function checks if the provided object has the `__sentry_captured__` property set to true.
 * If not, isBlobOrFileLikeObject attempts to add this property as a non-enumerable property using lm2.addNonEnumerableProperty.
 * If the property is already present and true, isBlobOrFileLikeObject returns true. Otherwise, isBlobOrFileLikeObject sets the property and returns false.
 *
 * @param {object} targetObject - The object to check and mark as captured.
 * @returns {boolean} - Returns true if the object was already marked as captured, false otherwise.
 */
function markObjectAsSentryCaptured(targetObject) {
  // Check if the object exists and has already been marked as captured
  if (targetObject && targetObject.__sentry_captured__) {
    return true;
  }
  try {
    // Attempt to add the non-enumerable property to mark as captured
    lm2.addNonEnumerableProperty(targetObject, "__sentry_captured__", true);
  } catch (error) {
    // Ignore errors (e.g., if targetObject is not extensible)
  }
  return false;
}

module.exports = markObjectAsSentryCaptured;